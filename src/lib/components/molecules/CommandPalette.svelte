<!--
@component
Here's some documentation for this component.
-->

<script lang="ts">
	import { query, filtered_todos } from "$stores/filteringStore";

	function onConsoleInput() {
		console.log($query);
		// console.log($filtered_todos);
	}
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
