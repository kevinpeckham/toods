<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// set data_handle
	setContext("data_handle", "description");

	// get todo_id
	const todo_id = getContext("todo_id");

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputText from "$atoms/FieldInputText.svelte";
	import FieldDisplayText from "$atoms/FieldDisplayText.svelte";

	// stores
	import { todos } from "$stores/todosStore";

	// *
</script>

<template lang="pug">
	+if('todo_id > -1')
		FieldContainer
			FieldInputText
			FieldDisplayText
</template>
