<!--
@component
Display-only layer for Tags field.
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

	// stores & settings
	import { todos } from "$stores/todosStore";

	// types
	import type { Writable } from "svelte/store";
	import type { Todo } from "$types/todoTypes";

	// props
	export let classes = "";

	// refs
	let div: HTMLDivElement;

	// $: {
	// 	if (div && div.previousElementSibling instanceof HTMLInputElement) {
	// 		input = div.previousElementSibling;
	// 	}
	// }

	// constants from context api
	const todo_readable = getContext("todo_readable") as Writable<Todo>;
	const data_handle = getContext("data_handle") as string;

	// // text value
	// let value: string;
	// $: value = $todos[todo_id][data_handle] as string;

	// style
	const default_classes = `
		absolute
		inset-0
		flex
		items-center
		leading-none
		opacity-0
		pointer-events-none
		peer-read-only:opacity-100
		px-2
	`;

	// group-focus-within:opacity-0
</script>

<template lang="pug">
	div(
		class!="{default_classes} { classes }",
		bind:this!="{ div }",
		data-field-display
	) { $todo_readable[data_handle] }
</template>
