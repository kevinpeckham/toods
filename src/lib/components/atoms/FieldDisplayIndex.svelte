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
		opacity-100
		user-select-none
		justify-end
		pr-2
		text-end
	`;
</script>

<template lang="pug">
	div(class!="{default_classes} { classes }", data-field-display) { $todo_readable.order ? $todo_readable.order : 0 }
</template>
