<!--
@component
Input field for todo description
#### *context:*
consumes "data_handle" from context api
consumes "todo_initial" from context api
consumes "todo_editable" from context api
#### *props:*
* prop - classes: string // default: ""
#### *elements:*
* .field-input: input
-->
<script lang="ts">
	// context api
	import { getContext } from "svelte";

	// stores & settings
	import { todos } from "$stores/todosStore";
	import { description_max_length } from "$stores/settings";

	// utils
	import { traverseTable } from "$utils/tableUtils";
	import { advanceCursorToEndOfTextInput } from "$utils/inputUtils";

	// types
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";

	// refs
	let input: HTMLInputElement;

	// constants from context api
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;

	// variables
	let value: string;
	let editable: boolean = false;

	// functions
	import {
		getFieldNextField,
		goDownOneRow,
		goUpOneRow,
	} from "$utils/tableUtils";

	// ** value
	// value is bound to the input element
	// when the user types in text, value is updated
	// when value is updated, todo_editable is updated, which updates the store
	const initial = todo_initial[data_handle];
	value = initial;

	// $: value = initial;

	// // enforce limits to length
	$: {
		if (value && value.length > $description_max_length) {
			value = value.slice(0, $description_max_length);
			value = value;
		}
	}

	// do not allow certain characters
	$: {
		// do not allow ticks
		if (value.includes("`")) {
			value = value.replace("`", "");
		}
	}

	$: {
		if (todo_editable[data_handle] != value) {
			todo_editable[data_handle] = value;
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
				event.preventDefault();
				traverseTable.down(input);
			},
			ArrowLeft() {
				if (!editable) {
					event.preventDefault();
					traverseTable.left(input);
				}
				return;
			},
			ArrowRight() {
				if (!editable) {
					event.preventDefault();
					traverseTable.right(input);
				}
				return;
			},
			ArrowUp() {
				event.preventDefault();
				traverseTable.up(input);
				return;
			},
			Enter() {
				// if active but not editable, make editable
				if (editable) {
					traverseTable.down(input);
				} else {
					editable = true;
					advanceCursorToEndOfTextInput(input, value);
					event.preventDefault();
				}
			},
			Escape() {
				if (editable) editable = false;
			},
			Tab() {
				if (!event.shiftKey) {
					traverseTable.right(input);
				} else traverseTable.left(input);
				event.preventDefault();
			},
		};
		if (action[key]) action[key]();
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
	selection:bg-accent
	selection:text-primary
	truncate
	group-focus-within:outline
	pointer-events-auto
	px-2
	`;

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
		bind:value!="{ value }",
		data-cell-input="",
		data-editable!="{ editable ? '' : null }",
		data-field!="{ data_handle }",
		max-length!="{ $description_max_length }",
		on:blur!="{ onBlur }",
		on:keydown!="{ onKeydown }",
		on:mousedown!="{ onMousedown }",
		type!="text"
	)
</template>
