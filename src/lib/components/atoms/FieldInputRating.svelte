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

	// props
	export let classes = "";

	// refs
	let input: HTMLInputElement;

	// stores
	import { todos } from "$stores/todosStore";
	import { columns } from "$stores/columnsStore";
	import type { Column } from "$types/columnTypes";

	// constants
	const todo_id = getContext("todo_id") as number;
	const data_handle = getContext("data_handle") as string;
	const symbol = getContext("symbol") as string;
	const initialNumberValue = getInitialNumberValue() as number;

	// variables
	let input_string_value: string;
	let value: number;

	// set input string value
	input_string_value = initialNumberValue.toString();

	// whenever input_string_value changes, validate & update value
	$: {
		value = Number(input_string_value);
		if (valueNumIsValid() && $todos && $todos[todo_id][data_handle] !== value) {
			$todos[todo_id][data_handle] = value;
			$todos[todo_id].updated = new Date().toISOString();
		}
	}

	function valueNumIsValid() {
		return typeof value == "number" && value >= 0 && value <= 3;
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
		const new_value = value + 1;
		if (new_value <= 3) {
			input_string_value = new_value.toString();
		} else input_string_value = "0";
	}
	function decrementRating() {
		const new_value = value - 1;
		if (new_value < 0) {
			input_string_value = "3";
		} else input_string_value = new_value.toString();
	}
	function getInitialNumberValue() {
		// get value from store
		const storeVal = $todos[todo_id][data_handle];
		// prove that is is a number & valid
		const valid = typeof storeVal == "number" && storeVal ? storeVal : 0;
		// deep copy the string
		const deep = valid ? JSON.parse(JSON.stringify(storeVal)) : "";
		// prove that it's a number and valid
		const result = deep && typeof deep == "number" ? deep : 0;
		return result;
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
			if (input_string_value !== key) input_string_value = key;
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
		// else if  key is a letter, prevent default
		else if (key.match(/[a-z]/i)) {
			event.preventDefault();
			incrementRating();
			return;
		}
		// else if key is symbol
		else if (key === symbol) {
			event.preventDefault();
			incrementRating();
			return;
		}
		//- any other key, prevent default
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
		bind:value!="{ input_string_value }",
		data-cell-input="",
		data-field!="{ data_handle }",
		max="3",
		min="0",
		on:focus!="{ input.select() }",
		on:keydown!="{ onKeydown }",
		type!="number"
	)
</template>
