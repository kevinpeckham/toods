<!--
@component
Component for checkbox input
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

	// stores
	import { todos } from "$stores/todosStore";

	// pulling initial value from store
	const initialValue = getInitialValue() as boolean;
	let value: boolean = initialValue;

	// update store when value changes
	$: {
		if (
			value != null &&
			value != undefined &&
			typeof value === "boolean" &&
			$todos &&
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
	outline-transparent
	group-focus-within:opacity-100
	group-focus-within:outline
	pointer-events-auto
	`;

	// functions
	function getInitialValue() {
		// get value from store
		const value = $todos[todo_id][data_handle];
		// prove that value is boolean and valid
		const valid =
			value != undefined && value != null && typeof value == "boolean"
				? value
				: false;
		// deep copy the boolean
		const deep = valid ? JSON.parse(JSON.stringify(valid)) : false;
		// prove that deep copy is boolean and valid
		const result =
			deep != undefined && deep != null && typeof deep == "boolean"
				? deep
				: false;
		return result;
	}
</script>

<template lang="pug">
	input.field-input.peer.accent-accent(
		class!="{default_classes} { classes }",
		bind:checked!="{ value }",
		data-cell-input="",
		data-field!="{ data_handle }",
		type!="checkbox"
	)
</template>
