<!--
@component
Component for date cell
#### *context:*
consumes "todo_id" from context api
sets "data_handle" to context api
#### *props:*
* prop - classes: string // default: ""
-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// set data_handle
	setContext("data_handle", "due");

	// get todo_id
	const todo_id = getContext("todo_id") as number;

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputDate from "$atoms/FieldInputDate.svelte";
	import FieldDisplayDate from "$atoms/FieldDisplayDate.svelte";
</script>

<template lang="pug">
	+if('todo_id > -1')
		FieldContainer
			FieldInputDate
			FieldDisplayDate
</template>
