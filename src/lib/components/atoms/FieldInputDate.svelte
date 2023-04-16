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

	// utils
	import { tableUtils } from "$utils/tableUtils";
	import { inputUtils } from "$utils/inputUtils";

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

	// shorthand and other constants
	const iu = inputUtils;
	const tu = tableUtils;

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
	let default_classes: string;
	$: default_classes = `
	bg-transparent
	h-full
	w-full
	py-1
	opacity-100
	read-only:opacity-0
	leading-none
	select-all
	selection:bg-accent
	selection:text-primary
	text-center
	group-focus-within:outline
	pointer-events-auto
	`;

	function onKeydown(event: KeyboardEvent) {
		// constants
		const e = event;
		const key = e.key;
		const pd = "preventDefault";
		const allowedNumbers = ["0", "1", "2", "3"];

		interface Actions {
			[key: string]: () => void;
		}

		const action: Actions = {
			ArrowUp: () => (input.readOnly ? tu.up(e, pd) : null),
			ArrowDown: () => (input.readOnly ? tu.down(e, pd) : null),
			ArrowRight: () => (input.readOnly ? tu.right(e, pd) : null),
			ArrowLeft: () => (input.readOnly ? tu.left(e, pd) : null),
			Enter: () => iu.toggleReadOnly(e),
			Space: () => iu.removeReadOnly(e),
			Escape() {
				if (!input.readOnly) iu.setReadOnly(e);
				else if (input.readOnly) tu.getRowFromField(input)?.focus();
			},
			Tab: () =>
				input.readOnly ? (e.shiftKey ? tu.left(e, pd) : tu.right(e, pd)) : null,
		};

		// if an action key is pressed, run action
		if (action[key]) {
			e.stopPropagation();
			action[key]();
		}
		// if a number key is pressed, make editable
		const regexp = new RegExp(/^[0-9]$/);
		if (regexp.test(key)) iu.removeReadOnly(e);
	}

	function onBlur(event: KeyboardEvent) {
		iu.setReadOnly(event);
	}
	function onMousedown(event: MouseEvent) {
		iu.removeReadOnly(event);
	}
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		bind:this!="{ input }",
		bind:value!="{ value }",
		data-field!="due",
		data-field-input,
		max="2099-12-31",
		min="2022-01-01",
		on:blur|stopPropagation!="{ onBlur }",
		on:keydown|stopPropagation!="{ onKeydown }",
		on:mousedown|stopPropagation!="{ onMousedown }",
		readonly!="true",
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
