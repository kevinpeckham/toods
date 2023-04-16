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

	// stores
	import { todos } from "$stores/todosStore";

	// utils
	import { stringUtils } from "$lib/utils/stringUtils";
	import { arrayUtils } from "$lib/utils/arrayUtils";
	import { tableUtils } from "$lib/utils/tableUtils";
	import { inputUtils } from "$utils/inputUtils";

	// types
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";
	export let max_length = 120;

	// refs
	let input: HTMLInputElement;

	// constants from context api
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;

	// shorthand and other constants
	const au = arrayUtils;
	const iu = inputUtils;
	const su = stringUtils;
	const tu = tableUtils;

	// variables
	let value: string;
	let array: string[];

	// ** value
	// value is bound to the input element
	// when the user types in text, value is updated
	const initial = todo_initial[data_handle] as string[];

	value = au.stringArrayToString(initial);
	// as value changes, value is formatted and filtered
	$: {
		const f1 = su.replaceSpacesWithCommas(value);
		const f2 = su.removeInitialComma(f1);
		const f3 = su.removeRepeatedCommas(f2);
		const f4 = su.removeUpperCaseLetters(f3);
		const f5 = su.removeUnlistedSpecialCharacters(f4, [":", " "]);
		value = f5;
	}

	// ** array
	// array is derived from value
	// when value changes, array is updated
	$: array = au.convertedAndScrubbedArray(value);

	// ** updating the store
	// store gets updated when array changes
	$: {
		if (todo_editable[data_handle] !== array) {
			todo_editable[data_handle] = array;
			$todos = $todos;
		}
	}

	function onKeydown(event: KeyboardEvent) {
		// constants
		const e = event;
		const key = e.key;
		const pd = "preventDefault";
		const Space = " ";

		interface Actions {
			[key: string]: () => void;
		}

		const action: Actions = {
			ArrowUp: () => tu.up(e, pd),
			ArrowDown: () => tu.down(e, pd),
			ArrowRight: () => (input.readOnly ? tu.right(e, pd) : null),
			ArrowLeft: () => (input.readOnly ? tu.left(e, pd) : null),
			Enter() {
				iu.toggleReadOnly(e);
				iu.advanceCursorToEndOfTextInput(input, value);
			},
			Space() {
				if (input.readOnly) iu.advanceCursorToEndOfTextInput(input, value);
				iu.removeReadOnly(e);
			},
			Escape() {
				if (!input.readOnly) iu.setReadOnly(e);
				else if (input.readOnly) tu.getRowFromField(input)?.focus();
			},
			Tab: () => (e.shiftKey ? tu.left(e, pd) : tu.right(e, pd)),
		};

		if (action[key] && key !== Space) {
			action[key]();
			return;
		} else if (key === Space) {
			action["Space"]();
		}

		//- if key is a letter, number, or space, make editable
		//- and move cursor to end of input

		const regexp = new RegExp(/^[a-zA-Z0-9: ]$/);
		if (regexp.test(key)) {
			iu.removeReadOnly(event);
		}
	}

	function onBlur(event: KeyboardEvent) {
		const input = event.target as HTMLInputElement;
		const scrubbed = su.removeFinalComma(value);
		if (value != scrubbed) value = scrubbed;
		iu.setReadOnly(event);
	}

	function onMousedown(event: MouseEvent) {
		iu.removeReadOnly(event);
	}

	function onFocus(event: MouseEvent) {
		iu.advanceCursorToEndOfTextInput(input, value);
	}

	// style classes
	$: default_classes = `
	bg-transparent
	group-focus-within:outline
	h-full
	leading-none
	outline-transparent
	opacity-100
	pointer-events-auto
	px-2
	py-1
	read-only:opacity-0
	selection:bg-accent
	selection:text-primary
	w-full
	`;
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		autocomplete="off",
		bind:this!="{ input }",
		bind:value!="{ value }",
		data-field!="{ data_handle }",
		data-field-input,
		id!="{todo_initial.unique}-{data_handle}",
		max-length!="{ max_length }",
		on:blur|stopPropagation!="{ onBlur }",
		on:focus|stopPropagation!="{ onFocus }",
		on:keydown|stopPropagation!="{ onKeydown }",
		on:mousedown|stopPropagation!="{ onMousedown }",
		readonly!="readonly",
		spellcheck="false",
		type!="text"
	)
</template>
