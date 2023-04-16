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

	// utils
	import { tableUtils } from "$utils/tableUtils";
	import { inputUtils } from "$utils/inputUtils";
	import { stringUtils } from "$utils/stringUtils";
	import { arrayUtils } from "$utils/arrayUtils";

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
	const au = arrayUtils;
	const iu = inputUtils;
	const su = stringUtils;
	const tu = tableUtils;

	// variables
	let value: string;

	// ** value
	// value is bound to the input element
	// when the user types in text, value is updated
	// when value is updated, todo_editable is updated, which updates the store
	const initial = todo_initial[data_handle];
	value = initial;

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

	// functions
	// function toggleReadOnly() {
	// 	readonly = !readonly;
	// }
	function onKeydown(event: KeyboardEvent) {
		// constants
		const e = event;
		const key = e.key;
		const pd = "preventDefault";

		interface Actions {
			[key: string]: () => void;
		}
		const action: Actions = {
			ArrowUp: () => tu.up(e, pd),
			ArrowDown: () => tu.down(e, pd),
			ArrowRight: () => (input.readOnly ? tu.right(e, pd) : null),
			ArrowLeft: () => (input.readOnly ? tu.left(e, pd) : null),
			Enter() {
				iu.toggleReadOnly(e);
				iu.advanceCursorToEndOfTextInput(input, value);
			},
			Space() {
				if (input.readOnly) iu.advanceCursorToEndOfTextInput(input, value);
				iu.removeReadOnly(e);
			},
			Escape() {
				if (!input.readOnly) {
					iu.setReadOnly(e);
					iu.advanceCursorToEndOfTextInput(input, value);
				} else if (input.readOnly) tu.getRowFromField(input)?.focus();
			},
			Tab: () => (e.shiftKey ? tu.left(e, pd) : tu.right(e, pd)),
		};
		if (action[key]) action[key]();
		else if (key.match(/^.$/)) iu.removeReadOnly(e);
	}

	function onBlur(event: KeyboardEvent) {
		iu.setReadOnly(event);
	}
	function onMousedown(event: MouseEvent) {
		iu.removeReadOnly(event);
	}
</script>

<template lang="pug">
	input.field-input.peer.px-2(
		class!="{ classes }",
		bind:this!="{ input }",
		bind:value!="{ value }",
		data-field!="{ data_handle }",
		data-field-input,
		max-length!="{ $description_max_length }",
		on:blur|stopPropagation!="{ onBlur }",
		on:keydown|stopPropagation!="{ onKeydown }",
		on:mousedown|stopPropagation!="{ onMousedown }",
		readonly!="true",
		type!="text"
	)
</template>
