<!--
@component
Component for text input
#### *context:*
consumes "todo_id" from context api
consumes "data_handle" from context api
consumes "symbol" from context api
#### *props:*
* prop - classes: string // default: ""
* prop - max_length?: number	// default: 120

-->
<script lang="ts">
	// context api
	import { getContext } from "svelte";

	// stores
	import { todos } from "$stores/todosStore";

	// utils
	import { traverseTable } from "$utils/tableUtils";
	import { advanceCursorToEndOfTextInput } from "$utils/inputUtils";

	// types
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";

	// refs
	let input: HTMLInputElement;

	// constants
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;
	const symbol = getContext("symbol") as string;

	// variables
	let value_string: string;
	let value_num: number;
	let editable: boolean = false;

	// functions
	import { getFieldNextField } from "$utils/tableUtils";

	// * variables

	// ** value_string
	// value_string is bound to the input element
	// when value_string is updated, value_num is updated
	const initialStringValue = todo_initial[data_handle].toString();
	value_string = initialStringValue ? initialStringValue : 0;

	// ** value_num
	// value_num is reactively derived from value_string
	// when value_string is updated, value_num is updated
	$: value_num = Number(value_string) != undefined ? Number(value_string) : -1;
	// ** todo_editable and updating the $todos (store)
	// todo_editable is a copy of the todo in the store
	// when value_num is updated, todo_editable is updated, which updates the store
	$: {
		if (todo_editable[data_handle] != value_num) {
			todo_editable[data_handle] = value_num;
			$todos = $todos;
		}
	}

	// style classes
	const default_classes = `
	bg-transparent
	h-full
	w-full
	py-1
	opacity-0
	data-[editable]:opacity-100
	leading-none
	outline-transparent
	select-all
	selection:bg-accent
	selection:text-primary
	text-center
	group-focus-within:outline
	pointer-events-auto
	`;

	// functions

	function incrementRating() {
		const new_value = value_num + 1;
		if (new_value <= 3) {
			value_string = new_value.toString();
		} else value_string = "0";
	}
	function decrementRating() {
		const new_value = value_num - 1;
		if (value_num <= 0) {
			value_string = "3";
		} else value_string = (value_num - 1).toString();
	}

	function onKeydown(event: KeyboardEvent) {
		const key = event.key;
		const Space = " ";
		const allowedNumbers = ["0", "1", "2", "3"];

		interface Actions {
			[key: string]: () => void;
		}
		const action: Actions = {
			ArrowDown() {
				if (!editable) traverseTable.down(input);
				else {
					event.preventDefault();
					decrementRating();
				}
			},
			ArrowLeft() {
				if (!editable) traverseTable.left(input);
				return;
			},
			ArrowRight() {
				if (!editable) traverseTable.right(input);
				return;
			},
			ArrowUp() {
				if (!editable) traverseTable.up(input);
				else {
					event.preventDefault();
					incrementRating();
				}
			},
			Enter() {
				// if active but not editable, make editable
				if (editable) {
					traverseTable.down(input);
				} else {
					editable = true;
					event.preventDefault();
				}
			},
			Escape() {
				if (editable) editable = false;
			},
			Space() {
				event.preventDefault();
				if (editable) incrementRating();
				else {
					editable = true;
				}
			},
			Tab() {
				if (!event.shiftKey) {
					traverseTable.right(input);
				} else traverseTable.left(input);
				event.preventDefault();
			},
		};

		// "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape", "Tab"
		if (action[key]) action[key]();
		// space bar
		else if (key == " ") action["Space"]();
		// allowed numbers
		else if (allowedNumbers.includes(key)) {
			event.preventDefault();
			if (value_string !== key) {
				value_string = key;
			}
			return;
		}

		// disallowed numbers
		else if (key.match(/^[4-9]$/)) {
			event.preventDefault();
			// value_string = "0";
			return;
		}

		// anything else
		else {
			return;
		}
	}

	function onBlur(event: KeyboardEvent) {
		if (editable) editable = false;
	}
	function onMousedown(event: MouseEvent) {
		if (!editable) editable = true;
	}
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		bind:this!="{ input }",
		bind:value!="{ value_string }",
		data-cell-input="",
		data-editable!="{ editable ? '' : null }",
		data-field!="{ data_handle }",
		max="3",
		min="0",
		on:blur!="{ onBlur }",
		on:keydown!="{ onKeydown }",
		on:mousedown!="{ onMousedown }",
		type!="number"
	)
</template>
