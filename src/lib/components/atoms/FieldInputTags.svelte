<!--
@component
Component for text input
#### *context:*
consumes "todo_id" from context api
consumes "data_handle" from context api
#### *props:*
* prop - classes: string // default: ""
* prop - max_length?: number	// default: 120
#### *elements:*
* .field-input: input
-->
<script lang="ts">
	// context api
	import { getContext } from "svelte";

	// constants from context api
	const todo_id = getContext("todo_id") as number;
	const data_handle = getContext("data_handle") as string;

	// props
	export let classes = "";
	export let max_length = 120;

	// stores
	import { todos } from "$stores/todosStore";
	import { construct_svelte_component } from "svelte/internal";

	// pulling initial value from store
	const initialArrayValue = getInitialArrayValue();
	let value: string[] = initialArrayValue;
	let tagString = stringArrayToString(value);

	function replaceSpacesWithCommas(str: string) {
		return str.replace(/\s/g, ",");
	}

	function removeRepeatedCommas(str: string) {
		return str.replace(/,{2,}/g, ",");
	}
	function removeInitialComma(str: string) {
		if (str[0] === ",") {
			return str.slice(1);
		} else {
			return str;
		}
	}
	function onKeydown(event: KeyboardEvent) {
		const key = event.key;

		// if space  or comma then prevent default and add comma
		if (key === " " || key === ",") {
			event.preventDefault();

			// if last character is not a comma, add one
			const processed1 =
				tagString[tagString.length - 1] !== "," ? tagString + "," : tagString;

			// remove repeated commas
			const processed2 = removeRepeatedCommas(processed1);

			// remove initial comma
			const processed3 = removeInitialComma(processed2);

			// update tagString if it has changed
			if (processed3 !== tagString) {
				tagString = processed3;
			}
		}
		// if it is shift + 3 then allow it
		else if (key === "#" && event.shiftKey) {
			event.preventDefault();
		}
		// if it is an allowed character A-Z or a-z or 0-9 or ':' or "-" or "_"
		// then allow it
		else if (
			(key >= "a" && key <= "z") ||
			// (key >= "A" && key <= "Z") ||
			(key >= "0" && key <= "9") ||
			key === ":" ||
			key === "-" ||
			key === "_"
			// key === "@"
		) {
			return;
		} else if (key === "Enter") {
			event.preventDefault();
		} else if (key === "Tab") {
			// event.preventDefault();
			// advance to next cell
		} else {
			return;
		}
	}

	function onChange(event: KeyboardEvent) {
		// remove comma from end of tagString if it exists
		if (tagString[tagString.length - 1] === ",") {
			tagString = tagString.slice(0, -1);
		}
		// convert tagString to lowercase
		tagString = tagString.toLowerCase();
	}

	function onPaste(event: ClipboardEvent) {
		// get pasted text
		const pastedText = event.clipboardData?.getData("text");

		if (!pastedText) {
			return;
		}

		event.preventDefault();

		// remove double-spaces
		const processed0 = pastedText.replace(/\s\s+/g, " ");

		// remove leading and trailing spaces
		const processed1 = processed0.trim();

		// replace spaces with commas
		const processed2 = replaceSpacesWithCommas(processed1);

		// remove repeated commas
		const processed3 = removeRepeatedCommas(processed2);

		// remove initial comma
		const processed4 = removeInitialComma(processed3);

		// update tagString if it has changed
		if (processed4 !== tagString) {
			tagString = processed4;
		}
	}

	// update value as tagString changes
	$: {
		if (tagString.length >= 1) {
			let processed: string = tagString;

			// split string by comma
			const split = tagString.split(",");

			// remove empty strings
			const filtered = split.filter((item) => item.length > 0);

			// lowercase all strings
			const lowercased = filtered.map((item) => item.toLowerCase());

			// remove #
			const noHash = lowercased.map((item) => item.replace("#", ""));

			// save value
			if (value != split) value = noHash;
		} else {
			value = [];
		}
	}
	// as value changes, update store
	$: {
		if (value.length >= 0 && $todos[todo_id][data_handle] !== value) {
			$todos[todo_id][data_handle] = value;
		}
	}

	// style classes
	const default_classes = `
	bg-transparent
	h-full
	w-full
	py-1
	opacity-0
	leading-none
	outline-transparent
	selection:bg-accent
	selection:text-primary
	group-focus-within:opacity-100
	group-focus-within:outline
	pointer-events-auto
	px-2
	`;

	// functions
	function getInitialArrayValue() {
		const emptyStringArray: string[] = [];
		// get value from store
		const storeVal = $todos[todo_id][data_handle] as string[];
		// prove that it's a string[] & valid
		const valid = storeVal ? storeVal : emptyStringArray;

		// deep copy the string
		const deep = valid
			? (JSON.parse(JSON.stringify(valid)) as string[])
			: emptyStringArray;
		return deep;
	}
	function stringArrayToString(stringArray: string[]) {
		return stringArray.join(",");
	}
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		autocomplete="off",
		bind:value!="{ tagString }",
		data-cell-input="",
		data-field!="{ data_handle }",
		max-length!="{ max_length }",
		on:blur!="{ onChange }",
		on:keydown!="{ onKeydown }",
		on:paste!="{ onPaste }",
		spellcheck="false",
		type!="text"
	)
</template>
