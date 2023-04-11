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
	import { columns } from "$stores/columnsStore";
	import type { Column } from "$types/columnTypes";

	// types
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";

	// refs
	let input: HTMLInputElement;

	// functions
	import { getFieldNextField } from "$utils/tableUtils";

	// constants
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;
	const symbol = getContext("symbol") as string;
	// initial value

	// set input string value
	// input_string_value = initialNumberValue.toString();

	// * variables

	// ** value_string
	// value_string is bound to the input element
	// when value_string is updated, value_num is updated
	const initialStringValue = todo_initial[data_handle].toString();
	let value_string: string;
	value_string = initialStringValue ? initialStringValue : 0;

	// ** value_num
	// value_num is reactively derived from value_string
	// when value_string is updated, value_num is updated
	let value_num: number;
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
	leading-none
	outline-transparent
	select-all
	selection:bg-accent
	selection:text-primary
	text-center
	group-focus-within:opacity-100
	group-focus-within:outline
	pointer-events-auto
	`;

	// functions

	function incrementRating() {
		const new_value = value_num + 1;
		if (new_value <= 3) {
			value_string = new_value.toString();
			console.log(value_string);
		} else value_string = "0";
	}
	function decrementRating() {
		const new_value = value_num - 1;
		if (new_value < 0) {
			value_string = "3";
		} else value_string = new_value.toString();
	}

	function onKeydown(event: KeyboardEvent) {
		const key = event.key;

		const allowed_keys = [
			"Tab",
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"Backspace",
			"Delete",
			"Enter",
			"Escape",
			"Home",
			"End",
			"PageUp",
			"PageDown",
		];
		const allowedNumbers = ["0", "1", "2", "3"];

		//-- if key is an allowed number, replace value with new value
		if (allowedNumbers.includes(key)) {
			event.preventDefault();
			if (value_string !== key) value_string = key;
			return;
		}
		//-- if key matches up arrow
		else if (key === "ArrowUp") {
			event.preventDefault();
			incrementRating();
			return;
		}
		//- if key matches down arrow
		else if (key === "ArrowDown") {
			event.preventDefault();
			decrementRating();
			return;
		}
		//- else if key is tab
		else if (key === "Tab") {
			// allow default
			return;
		}

		//- key is escape
		else if (key == "Escape") {
			event.preventDefault();
			input.blur();
			const row = input.closest("[data-table-row]") as HTMLDivElement;
			row.focus();
		}

		//- key is enter; accept value + advance to next cell
		else if (key == "Enter") {
			event.preventDefault();
			const nextField = getFieldNextField(input);
			if (nextField) nextField.focus();
			return;
		}

		// - key is symbol
		else if (key === symbol) {
			event.preventDefault();
			incrementRating();
			return;
		}

		//- not an allowed key
		else if (!allowed_keys.includes(key)) {
			event.preventDefault();
			return;
		}

		//- remaining keys are allowed
		else {
			return;
		}
	}
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		bind:this!="{ input }",
		bind:value!="{ value_string }",
		data-cell-input="",
		data-field!="{ data_handle }",
		max="3",
		min="0",
		on:focus!="{ input.select() }",
		on:keydown!="{ onKeydown }",
		type!="number"
	)
</template>
