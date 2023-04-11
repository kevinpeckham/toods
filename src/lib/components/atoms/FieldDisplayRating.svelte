<!--
@component
Field display text component part of a text cell component.
#### *context:*
consumes "todo_id" from context api
consumes "data_handle" from context api
consumes "symbol" from context api
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

	// props
	export let classes = "";

	// constants
	const todo_readable = getContext("todo_readable") as Writable<Todo>;
	const data_handle = getContext("data_handle") as string;
	const symbol = getContext("symbol") as string;

	// text value
	let value: string;
	$: value = $todo_readable[data_handle] as string;

	// number value
	let valueNum: number;
	$: valueNum = Number($todo_readable[data_handle]);

	// display value
	let display_value: string;
	$: display_value = value ? symbol.repeat(valueNum) : "";

	// style
	let default_classes: string;
	$: default_classes = `
		absolute
		inset-0
		flex
		justify-center
		items-center
		leading-none
		pointer-events-none
		peer-data-[editable]:opacity-0
		w-full
		${valueNum === 3 ? "bg-accent text-primary" : ""}
	`;
</script>

<template lang="pug">
	.field-display(class!="{default_classes} { classes }") { display_value }
</template>
