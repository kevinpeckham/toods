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
	import {
		goDownOneRow,
		goUpOneRow,
		goLeftOneCell,
		goRightOneCell,
		traverseTable,
	} from "$lib/utils/tableUtils";

	// field utils
	import { advanceCursorToEndOfTextInput } from "$utils/inputUtils";

	// types
	import type { Writable } from "svelte/store";
	import type { Todo } from "$types/todoTypes";
	import { prevent_default } from "svelte/internal";

	// props
	export let classes = "";
	export let max_length = 120;

	// refs
	let input: HTMLInputElement;

	// constants from context api
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;

	// variables
	let value: string;
	let array: string[];
	let editable: boolean;
	editable = false;

	// ** value
	// value is bound to the input element
	// when the user types in text, value is updated
	const initial = todo_initial[data_handle] as string[];

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

		interface Actions {
			[key: string]: () => void;
		}
		const action: Actions = {
			ArrowDown() {
				traverseTable.down(input);
			},
			ArrowLeft() {
				if (!editable) traverseTable.left(input);
				else null;
			},
			ArrowRight() {
				if (!editable) traverseTable.right(input);
				else null;
			},
			ArrowUp() {
				traverseTable.up(input);
			},
			Enter() {
				// if active but not editable, make editable
				if (editable) {
					traverseTable.down(input);
					editable = false;
				} else {
					editable = true;
					advanceCursorToEndOfTextInput(input, value);
					prevent_default(event);
				}
			},
			Escape() {
				editable = false;
			},
			Tab() {
				traverseTable.right(input);
			},
		};

		if (action[key]) action[key]();

		//- if key is a letter, number, or space, make editable
		//- and move cursor to end of input

		const regexp = new RegExp(/^[a-zA-Z0-9: ]$/);
		if (regexp.test(key)) {
			if (!editable) editable = true;
		}
	}

	function onBlur(event: KeyboardEvent) {
		const scrubbed1 = removeFinalComma(value);
		if (value != scrubbed1) value = scrubbed1;
		if (editable) editable = false;
	}

	function onMousedown(event: MouseEvent) {
		if (!editable) editable = true;
	}

	// style classes
	$: default_classes = `
	bg-transparent
	h-full
	w-full
	py-1
	leading-none
	outline-transparent
	selection:bg-accent
	selection:text-primary
	opacity-0
	data-[editable]:opacity-100
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
		data-editable!="{ editable ? '' : null }",
		data-field!="{ data_handle }",
		id!="{todo_initial.unique}-{data_handle}",
		max-length!="{ max_length }",
		on:blur!="{ onBlur }",
		on:keydown!="{ onKeydown }",
		on:mousedown!="{ onMousedown }",
		spellcheck="false",
		type!="text"
	)
</template>
