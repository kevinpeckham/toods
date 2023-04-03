<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// set data_handle
	setContext("data_handle", "tags");

	// get todo_id
	const todo_id = getContext("todo_id");

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputTags from "$atoms/FieldInputTags.svelte";
	import FieldDisplayTags from "$atoms/FieldDisplayTags.svelte";

	// *
</script>

<template lang="pug">
	+if('todo_id > -1')
		FieldContainer
			FieldInputTags
			FieldDisplayTags
</template>
