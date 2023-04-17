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
	import { tableUtils } from "$lib/utils/tableUtils";
	import { inputUtils } from "$utils/inputUtils";

	// types
	import type { Todo } from "$types/todoTypes";
	import { construct_svelte_component } from "svelte/internal";

	// props
	export let classes = "";

	// refs
	let input: HTMLInputElement;

	// constants from context api
	const data_handle = getContext("data_handle") as string;
	const todo_initial = getContext("todo_initial") as Todo;
	const todo_editable = getContext("todo_editable") as Todo;
	const index = getContext("index") as number;

	// shorthand and other constants
	const iu = inputUtils;
	const tu = tableUtils;

	// variables
	// variables
	let checked: boolean;
	let value_date: string | null;

	// ** checked
	// checked is bound to the input element
	// when the user toggles the checkbox, checked is updated
	const initialChecked = todo_initial[data_handle] ? true : false;
	checked = initialChecked;

	// when value is updated, todo_editable is updated, which updates the store
	const initialDate = todo_initial[data_handle];
	value_date = initialDate;

	$: {
		if (todo_editable[data_handle] != value_date) {
			todo_editable[data_handle] = value_date;
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
				iu.removeReadOnly(e);
				input.click();
				updateValueDate();
			},
			Escape() {
				if (!input.readOnly) iu.setReadOnly(e);
				else if (input.readOnly) tu.getRowFromField(input)?.focus();
			},
			Space() {
				iu.removeReadOnly(e);
				updateValueDate();
			},
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
		updateValueDate();
	}
	function updateValueDate() {
		value_date = checked ? null : new Date().toISOString();
	}
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{ classes }",
		bind:checked!="{ checked }",
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
