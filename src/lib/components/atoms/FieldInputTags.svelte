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
	// string utils
	import {
		replaceSpacesWithCommas,
		removeFinalComma,
		removeInitialComma,
		removeRepeatedCommas,
		removeUpperCaseLetters,
		removeUnlistedSpecialCharacters,
	} from "$lib/utils/stringUtils";
	// array utils
	import {
		stringArrayToString,
		convertedAndScrubbedArray,
	} from "$lib/utils/arrayUtils";
	// table utils
	import { goDownOneRow } from "$lib/utils/tableUtils";

	// types
	import type { Writable } from "svelte/store";
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

	// ** value
	// value is bound to the input element
	// when the user types in text, value is updated
	const initial = todo_initial[data_handle] as string[];
	let value: string;
	value = stringArrayToString(initial);

	// as value changes, value is formatted and filtered
	$: {
		const formatted1 = replaceSpacesWithCommas(value);
		const formatted2 = removeInitialComma(formatted1);
		const formatted3 = removeRepeatedCommas(formatted2);
		const formatted4 = removeUpperCaseLetters(formatted3);
		const formatted5 = removeUnlistedSpecialCharacters(formatted4, [":", " "]);

		value = formatted5;
	}

	// ** array
	// array is derived from value
	// when value changes, array is updated
	let array: string[];
	$: array = convertedAndScrubbedArray(value);

	// ** updating the store
	// store gets updated when array changes
	$: {
		if (todo_editable[data_handle] !== array) {
			todo_editable[data_handle] = array;
			$todos = $todos;
		}
	}

	function onKeydown(event: KeyboardEvent) {
		const key = event.key;
		const target = event.target as HTMLInputElement;
		let tagString = target.value;

		if (key === "Enter") {
			event.preventDefault();
			// advance to next cell
			goDownOneRow(input);
		} else if (key === "Tab") {
			// event.preventDefault();
			// advance to next cell
		} else {
			return;
		}
	}

	function onBlur(event: KeyboardEvent) {
		const scrubbed1 = removeFinalComma(value);
		if (value != scrubbed1) value = scrubbed1;
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
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		autocomplete="off",
		bind:this!="{ input }",
		bind:value!="{ value }",
		data-cell-input="",
		data-field!="{ data_handle }",
		max-length!="{ max_length }",
		on:blur!="{ onBlur }",
		on:keydown!="{ onKeydown }",
		spellcheck="false",
		type!="text"
	)

	//- 	,
</template>
