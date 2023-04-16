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

	// variables
	// let next: boolean;
	// $: next = false;

	// stores
	// import { todos } from "$stores/todosStore";

	// // get value of "data-next" from store
	// let data_next: "" | undefined;
	// $: data_next = $todos[todo_id]?.next ? "" : undefined;

	// classes

	// data-[next]:bg-blue-500
	// data-[next]:text-primary
	// data-[next]:focus-within:bg-slate-50/20
	// data-[next]:focus-within:text-white
	//- background
	const background_default = "bg-slate-50/10";
	const ring_default = "";
	const outline_default = "outline-blue-600 outline-1";
	const hover = "hover:bg-slate-50/5";
	//- focus within
	const focus_within_bg = "focus-within:bg-oxford/5";
	const focus_within_ring = "";
	const focus_within_outline = "";
	//- next
	const next_text = "data-[next]:text-primary";
	//- next + hover
	const next_hover = "";
	//- next + focus within
	const next_focus_within_bg = "";
	const next_focus_within_text = "data-[next]:focus-within:text-primary";
	const next_focus_within_ring = "data-[next]:focus-within:ring-accent";
	const next_focus_within_outline = "data-[next]:focus-within:outline-accent";

	// ("data-[next]:focus-within:ring-blue-700 ");

	const layoutStyles = `
	flex
	h-full
	overflow-hidden
	relative
	w-full
	`;

	const textStyles = `
	text-white
	data-[next]:text-primary
	data-[next]:focus-within:text-white
	`;
	const backgroundStyles = `
	bg-slate-500
	bg-opacity-[.25]
	`;
	const liminalStyles = `
	rounded-sm
	ring-0
	border-0
	outline-0
	`;

	let default_classes: string;
	$: default_classes = `
		group
		${layoutStyles}
		${textStyles}
		${liminalStyles}
		`;

	// console.log(index, $todo_readable.next);
</script>

<template lang="pug">
	.field-container(
		class!="{default_classes} { classes }",
		data-field-container,
		data-next!="{ $todo_readable.next ? '' : undefined }"
	)
		slot
</template>
