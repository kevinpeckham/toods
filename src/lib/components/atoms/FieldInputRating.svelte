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
	import { todos } from "$stores/todoStore";
	import { columns } from "$stores/columnsStore";
	import type { Column } from "$types/columnTypes";

	// constants
	const todo_id = getContext("todo_id") as number;
	const data_handle = getContext("data_handle") as string;
	const symbol = getContext("symbol") as string;
	const initialNumberValue = getInitialNumberValue();

	// variables
	let value: string = "0";
	let valueNum: number = 0;

	// pull initial value from store
	value = initialNumberValue.toString();

	// when value changes, update valueNum & store
	$: {
		valueNum = Number(value) ? Number(value) : 0;
		$todos[todo_id][data_handle] = valueNum;
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
	function valueAsNumber() {
		return parseInt(value) ? parseInt(value) : 0;
	}
	function incrementRating() {
		const num = valueAsNumber();
		if (num + 1 <= 3) value = `${num + 1}`;
		else value = "0";
	}
	function decrementRating() {
		const num = valueAsNumber();
		if (valueNum - 1 < 0) value = `3`;
		else value = `${num - 1}`;
	}
	function getInitialNumberValue() {
		// get value from store
		const storeVal = $todos[todo_id][data_handle];
		// prove that is is a number & valid
		const valid = typeof storeVal == "number" && storeVal >= 0 ? storeVal : 0;
		// deep copy the number
		const deep = valid ? JSON.parse(JSON.stringify(storeVal)) : 0;
		// prove that it's a number and valid
		const result = deep + 1 && typeof deep == "number" ? deep : 0;
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
			// prevent default
			event.preventDefault();
			if (value != key) value = "" + key;
			return;
		}
		//-- if key matches field symbol or up arrow
		else if (key === symbol || key === "ArrowUp") {
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
		bind:value!="{ value }",
		data-cell-input="",
		data-field!="{ data_handle }",
		on:focus!="{ input.select() }",
		on:keydown!="{ onKeydown }",
		size=1,
		type!="text"
	)
</template>
