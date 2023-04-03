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

	// constants from context api
	$: todo_id = getContext("todo_id") as number;
	$: data_handle = getContext("data_handle") as string;

	// props
	export let classes = "";

	// stores
	import { todos } from "$stores/todoStore";

	// text value
	let value: string;
	$: value = $todos[todo_id][data_handle] as string;

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
	.field-display(class!="{default_classes} { classes }") { value }
</template>
