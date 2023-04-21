<!--
@component
Here's some documentation for this component.
-->

<script lang="ts">
	import {
		query,
		queryArray,
		// regexQuery,
		filtered_todos,
	} from "$stores/filteringStore";
	import { todos, todos_searchable_text } from "$stores/todosStore";

	function onConsoleInput() {}
</script>

<template lang="pug">
	.mb-8.flex
		textarea#console.h-6.text-primary.text-14.w-80.flex.items-start.px-2(
			autocorrect="off",
			autofocus="",
			bind:value!="{ $query }",
			on:input!="{ onConsoleInput }",
			resize="noresize",
			style="resize: none"
		)
		//- results message
		+if('$filtered_todos.length !=0')
			.ml-6 { $filtered_todos.length } results
</template>
