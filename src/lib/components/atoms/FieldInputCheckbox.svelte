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

	// variables
	let value: boolean;

	// ** value
	// value is bound to the input element
	// when the user toggles the checkbox, value is updated
	// when value is updated, todo_editable is updated, which updates the store
	let initial: boolean;
	$: initial =
		todo_initial && todo_initial[data_handle]
			? todo_initial[data_handle]
			: false;
	$: value = initial;

	$: {
		if (todo_editable && todo_editable[data_handle] != value) {
			todo_editable[data_handle] = value;
			$todos = $todos;
		}
	}

	function onKeydown(event: KeyboardEvent) {
		// constants
		const e = event;
		const key = e.key;
		const pd = "preventDefault";
		const Space = " ";

		interface Actions {
			[key: string]: () => void;
		}

		// special
		const action: Actions = {
			ArrowUp: () => tu.up(e, pd),
			ArrowDown: () => tu.down(e, pd),
			ArrowLeft: () => tu.left(e, pd),
			ArrowRight: () => tu.right(e, pd),
			Enter() {
				event.preventDefault();
				value = !value;
			},
			Escape() {
				if (!input.readOnly) iu.setReadOnly(e);
				else if (input.readOnly) tu.getRowFromField(input)?.focus();
			},
			Space: () => iu.removeReadOnly(e),
		};
		if (action[key] && key != Space) {
			action[key]();
		} else if (key == Space) action["Space"]();
	}

	function onBlur(event: KeyboardEvent) {
		iu.setReadOnly(event);
	}
	function onMousedown(event: MouseEvent) {
		iu.removeReadOnly(event);
	}

	// style classes
	let default_classes: string;
	$: default_classes = ``;
</script>

<template lang="pug">
	//- div test
	input.field-input.peer.accent-accent(
		class!="{default_classes} { classes }",
		bind:checked!="{ value }",
		bind:this!="{ input }",
		data-field!="{ data_handle }",
		data-field-input,
		on:blur|stopPropagation!="{ onBlur }",
		on:keydown|stopPropagation!="{ onKeydown }",
		on:mousedown|stopPropagation!="{ onMousedown }",
		readonly!="true",
		type!="checkbox"
	)
</template>
