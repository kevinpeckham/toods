<!--
@component
Field displays store value for a given todo / data handle
Visible by default
Is hidden when cell is in edit mode.
#### *context:*
consumes "todo_readable" from context api
consumes "data_handle" from context api
#### *props:*
* prop - classes?: string

-->
<script lang="ts">
	// context api
	import { getContext } from "svelte";

	// stores
	import { todos } from "$stores/todosStore";
	import { breakpoint } from "$stores/layoutStore";

	// types
	import type { Writable } from "svelte/store";
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";

	// constants from context api
	const todo_readable = getContext("todo_readable") as Writable<Todo>;
	const data_handle = getContext("data_handle") as string;
	const index = getContext("index") as number;

	// style
	$: default_classes = `
		absolute
		inset-0
		flex
		items-center
		leading-none
		truncate
		user-select-none
		px-2
		focus:bg-blue-500
	`;
</script>

<template lang="pug">
	.field-display.pointer-events-none(class!="{default_classes} { classes }") { index }
</template>
