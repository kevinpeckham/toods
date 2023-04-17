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

	// styles
	let default_classes: string;
	$: default_classes = `
		justify-center
	`;
</script>

<template lang="pug">
	div(class!="{default_classes} { classes }", data-field-display) { $todo_readable[data_handle] ? symbol : "" }
</template>
