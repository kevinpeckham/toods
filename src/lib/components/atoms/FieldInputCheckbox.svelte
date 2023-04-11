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

	// stores
	import { todos } from "$stores/todosStore";

	// types
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";

	// constants from context api
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;

	// ** value
	// value is bound to the input element
	// when the user toggles the checkbox, value is updated
	// when value is updated, todo_editable is updated, which updates the store
	const initial = todo_initial[data_handle];
	let value: boolean;
	value = initial;

	$: {
		if (todo_editable[data_handle] != value) {
			todo_editable[data_handle] = value;
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
	outline-transparent
	group-focus-within:opacity-100
	group-focus-within:outline
	pointer-events-auto
	`;
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
