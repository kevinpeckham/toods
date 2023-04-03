<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// set data_handle
	setContext("data_handle", "next");

	// get todo_id
	const todo_id = getContext("todo_id");

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputCheckbox from "$atoms/FieldInputCheckbox.svelte";
	import FieldDisplayCheckboxMask from "$atoms/FieldDisplayCheckboxMask.svelte";
</script>

<template lang="pug">
	+if('todo_id > -1')
		FieldContainer(classes="data-[next]:!bg-accent")
			FieldInputCheckbox(classes="!opacity-0")
			FieldDisplayCheckboxMask(
				classes="!opacity-100 !text-primary  outline-accent",
				symbol!="!"
			)
</template>
