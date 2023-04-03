<!--
@component
Component for id input element
#### *context:*
consumes "todo_id" from context api
consumes "data_handle" from context api
#### *props:*
* prop - classes: string // default: ""

-->
<script lang="ts">
	// context api
	import { getContext } from "svelte";

	// constants from context api
	const todo_id = getContext("todo_id") as number;
	const data_handle = getContext("data_handle") as string;

	// props
	export let classes = "";

	// refs
	let input: HTMLInputElement;

	// stores
	import { todos } from "$stores/todosStore";

	// pulling initial value from store
	let value: string = getInitialDateStringValue();

	// when value changes, update store
	$: {
		if (
			value.length >= 0 &&
			value !== "Invalid Date" &&
			$todos &&
			$todos[todo_id] &&
			$todos[todo_id][data_handle] !== value
		) {
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
	select-all
	selection:bg-accent
	selection:text-primary
	text-center
	group-focus-within:opacity-100
	group-focus-within:outline
	pointer-events-auto
	`;

	// functions
	// function valueAsNumber() {
	// 	return parseInt(value) ? parseInt(value) : 0;
	// }
	// function incrementRating() {
	// 	const valueNum = valueAsNumber();
	// 	if (valueNum + 1 <= 3) value = `${valueNum + 1}`;
	// 	else value = "0";
	// }
	// function decrementRating() {
	// 	const valueNum = valueAsNumber();
	// 	if (valueNum - 1 < 0) value = `3`;
	// 	else value = "0";
	// }
	function getInitialDateStringValue() {
		// get value from store
		const storeVal = $todos[todo_id][data_handle];
		// prove that is is a string
		const string = typeof storeVal == "string" ? storeVal : "";
		// prove that it is a valid date
		const valid = new Date(string).toString() !== "Invalid Date";
		const validated = valid ? string : "2099-12-31";
		// deep copy the value
		const deep = valid ? JSON.parse(JSON.stringify(validated)) : "";
		// prove that it's a string and valid
		const result = typeof deep == "string" ? deep : "";
		return result;
	}
	// function onKeydown(event: KeyboardEvent) {
	// 	const key = event.key;

	// 	const allowed_keys = [
	// 		"Tab",
	// 		"ArrowUp",
	// 		"ArrowDown",
	// 		"ArrowLeft",
	// 		"ArrowRight",
	// 		"Backspace",
	// 		"Delete",
	// 		"Enter",
	// 		"Escape",
	// 		"Home",
	// 		"End",
	// 		"PageUp",
	// 		"PageDown",
	// 	];
	// 	const allowedNumbers = ["0", "1", "2", "3"];

	// 	//- if key is an allowed number, replace value with new value
	// 	if (allowedNumbers.includes(key)) {
	// 		// prevent default
	// 		event.preventDefault();
	// 		if (value != key) value = "" + key;

	// 		//- select text contents
	// 		// input.select();
	// 		return;
	// 	}
	// 	//- if key matches field symbol or up arrow
	// 	else if (key === symbol || key === "ArrowUp") {
	// 		event.preventDefault();
	// 		incrementRating();
	// 		input.select();
	// 		return;
	// 	}
	// 	//- if key matches down arrow
	// 	else if (key === "ArrowDown") {
	// 		event.preventDefault();
	// 		decrementRating();
	// 		return;
	// 	}
	// 	//- any other key, prevent default
	// 	else if (!allowed_keys.includes(key)) {
	// 		event.preventDefault();
	// 		return;
	// 	}
	// 	//- remaining keys are allowed
	// 	else {
	// 		return;
	// 	}
	// }
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		bind:this!="{ input }",
		bind:value!="{ value }",
		data-cell-input="",
		data-field!="due",
		max="2099-12-31",
		min="2022-01-01",
		size=1,
		type!="date"
	)
</template>

<style>
	::-webkit-datetime-edit-month-field:where(:active, :hover, :focus),
	::-webkit-datetime-edit-day-field:where(:active, :hover, :focus),
	::-webkit-datetime-edit-year-field:where(:active, :hover, :focus) {
		outline: none;
		background: var(--accent);
		color: var(--primary);
	}
	::-webkit-calendar-picker-indicator {
		outline: none;
		opacity: 0.75;
		filter: invert();
		position: relative;
	}
	::-webkit-calendar-picker-indicator:where(:active, :hover, :focus) {
		filter: invert(73%) sepia(92%) saturate(362%) hue-rotate(14deg)
			brightness(108%) contrast(102%);
		opacity: 1;
		color: var(--accent);
		overflow: hidden;
	}
</style>
