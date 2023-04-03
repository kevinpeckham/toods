<!--
@component
Field displays a boolean value that masks an input checkbox component.
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
	export let symbol = "*";

	// stores
	import { todos } from "$stores/todoStore";

	// text value
	let value: boolean;
	$: value = $todos[todo_id][data_handle] as boolean;

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
	.field-display(class!="{default_classes} { classes }") { value ? symbol : "" }
</template>
