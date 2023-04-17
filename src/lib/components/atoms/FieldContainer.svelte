<!--
@component
Field container component part of the cell component.
#### *context:*
consumes "todo_id" from context api
#### *props:*
* prop - classes: string
#### *elements:*
* .field-container: outer container

-->
<script lang="ts">
	// context api
	import { getContext, setContext } from "svelte";

	// types
	import type { Writable } from "svelte/store";
	import type { Todo } from "$types/todoTypes";

	// constants
	const todo_readable = getContext("todo_readable") as Writable<Todo>;
	const index = getContext("index") as number;

	// props
	export let classes: string = "";

	// style classes
	let default_classes: string;
	$: default_classes = `
	group
	flex
	h-full
	overflow-hidden
	pointer-events-none
	relative
	rounded-sm
	w-full
		`;
</script>

<template lang="pug">
	.field-container(
		class!="{default_classes} { classes }",
		data-field-container,
		data-next!="{ $todo_readable.next ? '' : undefined }"
	)
		slot
</template>
