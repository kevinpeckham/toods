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

	// props
	export let classes = "";

	// stores
	import { todos } from "$stores/todoStore";
	import { columns, column_next } from "$stores/columnsStore";

	// types
	import type { Column } from "$types/columnTypes";

	// constants
	const todo_id = getContext("todo_id") as number;
	const data_handle = getContext("data_handle") as string;
	const symbol = getContext("symbol") as string;

	// text value
	let value: string;
	$: value = $todos[todo_id][data_handle] as string;

	// number value
	let valueNum: number;
	$: valueNum = Number(value);

	// display value
	let displayValue: string;
	$: displayValue = value ? symbol.repeat(valueNum) : "";

	// style
	const default_classes = `
		absolute
		inset-0
		flex
		justify-center
		items-center
		leading-none
		pointer-events-none
		group-focus-within:opacity-0
		w-full
	`;
</script>

<template lang="pug">
	.field-display(class!="{default_classes} { classes }") { displayValue }
</template>
