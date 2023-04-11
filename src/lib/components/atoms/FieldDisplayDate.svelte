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
	$: {
		// update days left to due
		if (value) days = timeLeftInDays(new Date(value));
		else days = undefined;
	}

	// style
	const default_classes = `
		absolute
		inset-0
		flex
		items-center
		leading-none
		pointer-events-none
		group-focus-within:opacity-0
		px-2
	`;
</script>

<template lang="pug">
	.field-display(class!="{default_classes} { classes }") { days ? days + " days" : "" }
</template>
