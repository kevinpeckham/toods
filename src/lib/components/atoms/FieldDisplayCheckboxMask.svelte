<!--
@component
Field displays a boolean value that masks an input checkbox component.
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

	// types
	import type { Writable } from "svelte/store";
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";
	export let symbol = "*";

	// constants from context api
	const todo_readable = getContext("todo_readable") as Writable<Todo>;
	const data_handle = getContext("data_handle") as string;

	// style
	const default_classes = `
		absolute
		inset-0
		flex
		items-center
		justify-center
		leading-none
		pointer-events-none
		text-center
		w-full
	`;
</script>

<template lang="pug">
	.field-display(class!="{default_classes} { classes }") { $todo_readable[data_handle] ? symbol : "" }
</template>
