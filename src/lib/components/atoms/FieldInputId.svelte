<!--
@component
Component for id field input element
#### *context:*
consumes "todo_id" from context api
consumes "data_handle" from context api
#### *props:*
* prop - classes: string // default: ""

-->
<script lang="ts">
	// context api
	import { getContext } from "svelte";

	// constants from context api
	const todo_id = getContext("todo_id") as number;
	const data_handle = getContext("data_handle") as string;

	// props
	export let classes = "";

	// refs
	export let input: HTMLInputElement;

	// stores
	import { todos } from "$stores/todoStore";
	import { breakpoint } from "$stores/layoutStore";

	// style classes
	let default_classes: string;
	$: default_classes = `
	bg-transparent
	h-full
	w-full
	py-1
	opacity-0
	leading-none
	outline-transparent
	select-all
	selection:bg-accent
	selection:text-primary
	text-center
	${$breakpoint == "mobile" ? "" : "group-focus-within:opacity-100"}
	group-focus-within:outline
	pointer-events-auto
	`;

	const mobile_classes = `
	!opacity-0`;

	function onKeydown(event: KeyboardEvent) {
		if (event.key === "Backspace") {
			// remove current todo from $todos
		}
	}
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes } { $breakpoint === 'mobile' ? mobile_classes : '' }",
		bind:this!="{ input }",
		bind:value!="{ $todos[todo_id]['id'] }",
		data-cell-input="",
		data-field!="{ data_handle }",
		on:focus!="{ input.select() }",
		on:keydown!="{ onKeydown }",
		readonly="readonly",
		type!="text"
	)
</template>
