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

	// constants
	const todo_id = getContext("todo_id") as number;

	// props
	export let classes: string = "";

	// stores
	import { todos } from "$stores/todoStore";

	// get value of "data-next" from store
	let data_next: "" | undefined;
	$: data_next = $todos[todo_id]?.next ? "" : undefined;

	// classes
	const default_classes = `
		bg-slate-50/10
		data-[next]:bg-accent
		data-[next]:text-primary
		data-[next]:focus-within:bg-slate-50/20
		data-[next]:focus-within:text-white
		focus-within:ring-2
		group
		ring-offset-[-1px]
		ring-accent
		h-full
		overflow-hidden
		relative
		rounded-sm
		text-current
		w-full`;
</script>

<template lang="pug">
	.field-container(
		class!="{default_classes} { classes }",
		data-cell-container,
		data-next!="{ data_next }"
	)
		slot
</template>
