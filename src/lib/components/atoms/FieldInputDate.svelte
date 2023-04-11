<!--
@component
Input field for due date property
#### *context:*
consumes "data_handle" from context api
consumes "todo_initial" from context api
consumes "todo_editable" from context api
#### *props:*
* prop - classes: string // default: ""

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

	// refs
	let input: HTMLInputElement;

	// constants from context api
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;

	// * variables
	// pulling initial value from store
	let value: string = todo_initial[data_handle];

	// when value changes, update store
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
