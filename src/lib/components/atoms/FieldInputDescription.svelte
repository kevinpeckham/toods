<!--
@component
Component for text input
#### *context:*
consumes "todo_id" from context api
consumes "data_handle" from context api
#### *props:*
* prop - classes: string // default: ""
* prop - max_length?: number	// default: 120
#### *elements:*
* .field-input: input
-->
<script lang="ts">
	// context api
	import { getContext } from "svelte";

	// constants from context api
	const todo_id = getContext("todo_id") as number;
	const data_handle = getContext("data_handle") as string;

	// props
	export let classes = "";
	export let max_length = 120;

	// stores
	import { todos } from "$stores/todosStore";

	// pulling initial value from store
	const initialStringValue = getInitialTextValue();
	let value: string = initialStringValue;

	// enforce limits to value
	$: {
		if (value && value.length > max_length) {
			value = value.slice(0, max_length);
		}
	}

	// do not allow certain characters
	// regex for { } ` ~ ^ \
	$: {
		// do not allow ticks
		if (value && value.includes("`")) {
			value = value.replace(/`/g, "");
		}
	}

	// keep store updated as value changes
	$: {
		if (
			value !== null &&
			value !== undefined &&
			value.length < max_length &&
			!value.includes("`") &&
			$todos &&
			$todos[todo_id][data_handle] !== value
		) {
			$todos[todo_id][data_handle] = value;
		}
	}

	// style classes
	const default_classes = `
	bg-transparent
	h-full
	w-full
	py-1
	opacity-0
	leading-none
	outline-transparent
	selection:bg-accent
	selection:text-primary
	truncate
	group-focus-within:opacity-100
	group-focus-within:outline
	pointer-events-auto
	px-2
	`;

	// functions
	function getInitialTextValue() {
		// get value from store
		const storeVal = $todos[todo_id][data_handle];
		// prove that it's a string & valid
		const valid = storeVal && typeof storeVal == "string" ? storeVal : "";
		// deep copy the string
		const deep = valid ? (JSON.parse(JSON.stringify(valid)) as string) : "";
		// prove that it's a string & valid
		const result = deep && typeof deep == "string" ? deep : "";

		return result;
	}
</script>

<template lang="pug">
	input.field-input.peer(
		class!="{default_classes} { classes }",
		bind:value!="{ value }",
		data-cell-input="",
		data-field!="{ data_handle }",
		max-length!="{ max_length }",
		type!="text"
	)
</template>
