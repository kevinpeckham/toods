<!--
@component
Field display text component part of a text cell component.
#### *context:*
consumes "todo_id" from context api
consumes "data_handle" from context api
#### *props:*
* prop - classes?: string
#### *elements:*
* .field-container: outer container
-->
<script lang="ts">
	// context api
	import { getContext } from "svelte";

	// stores
	import { todos } from "$stores/todosStore";

	// types
	import type { Writable } from "svelte/store";
	import type { Todo } from "$types/todoTypes";

	// imported functions
	import { timeLeftInDays } from "$utils/todoUtils";

	// props
	export let classes = "";

	// constants from context api
	const todo_readable = getContext("todo_readable") as Writable<Todo>;
	const data_handle = getContext("data_handle") as string;

	// text value
	let value: string;
	$: value = $todo_readable[data_handle] as string;

	let days: number | undefined;
	let daysMessage: string;
	$: {
		// update days left to due
		if (value) days = timeLeftInDays(new Date(value)) + 1;
		else days = undefined;

		// messages
		const messages: { [key: string]: string } = {
			"undefined": "",
			"-1": "yesterday",
			"0": "today",
			"1": "tomorrow",
			"default": `${days} days`,
			"completed": "--",
		};
		if ($todo_readable.completed) daysMessage = messages["completed"];
		else if (days === undefined) daysMessage = messages["undefined"];
		else if (days >= -1 && days <= 1) daysMessage = messages[days?.toString()];
		else if (days <= 2 || days >= -2) daysMessage = messages["default"];
		else daysMessage = "";
	}

	// style
	let default_classes: string;
	$: default_classes = `
		px-2
	`;
</script>

<template lang="pug">
	div(class!="{default_classes} { classes }", data-field-display) { daysMessage }
</template>
