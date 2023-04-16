<!--
@component
Read-only input field for index property.
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
	import { breakpoint } from "$stores/layoutStore";

	// types
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";

	// refs
	export let input: HTMLInputElement;

	// constants from context api
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;

	// * variables
	let value_string: string;
	let value_num: number;

	// ** value_string
	// value_string is bound to the input element
	// when the user types a number, value_string is updated
	// when value_string is updated, value_num is updated
	const initialStringValue = todo_initial[data_handle].toString();
	value_string = initialStringValue;

	// ** value_num
	// value_num is reactively derived from value_string
	// when value_string is updated, value_num is updated\
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

	// * styling
	// field element is hidden (opacity 0) by default
	// when the user focuses on the field, the field element is shown (opacity 100)
	let default_classes: string;
	$: default_classes = `
	bg-transparent
	h-full
	w-full
	py-1
	px-2
	opacity-100
	leading-none
	outline-transparent
	select-none
	selection:bg-accent
	selection:text-primary
	text-right
	group-focus-within:outline
	pointer-events-none
	`;

	const mobile_classes = `
	!opacity-0`;

	function onFocus(event: FocusEvent) {
		// highlight row
		const field = input as HTMLInputElement;
		const row = field.closest("[data-table-row]") as HTMLDivElement;
		row.focus();
	}
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		bind:this!="{ input }",
		bind:value!="{ value_string }",
		data-cell-input="",
		data-field!="{ data_handle }",
		data-field-input,
		readonly="readonly",
		tabindex="-1",
		type!="text"
	)
	//- div(class!="{default_classes} { classes }", on:mousedown!="{ onMousedown }") { value_num }
</template>
<!-- 	readonly="readonly" -->
