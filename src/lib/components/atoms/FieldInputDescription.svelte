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

	// types
	import type { Todo } from "$types/todoTypes";

	// refs
	let input: HTMLInputElement;

	// props
	export let classes = "";

	// constants from context api
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;

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
	let value: string = initial;

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

		//- key is enter; accept value + advance to next cell
		if (key == "Enter" || key == "ArrowDown") {
			event.preventDefault();
			goDownOneRow(input);
			// const nextField = getFieldNextField(input);
			// if (nextField) nextField.focus();
			return;
		}
		if (key == "ArrowUp") {
			event.preventDefault();
			goUpOneRow(input);
			// const nextField = getFieldNextField(input);
			// if (nextField) nextField.focus();
			return;
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
	selection:bg-accent
	selection:text-primary
	truncate
	group-focus-within:opacity-100
	group-focus-within:outline
	pointer-events-auto
	px-2
	`;
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		bind:this!="{ input }",
		bind:value!="{ value }",
		data-cell-input="",
		data-field!="{ data_handle }",
		max-length!="{ $description_max_length }",
		on:keydown!="{ onKeydown }",
		type!="text"
	)
</template>
