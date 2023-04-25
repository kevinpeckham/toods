<!--
@component
Here's some documentation for this component.
-->

<script lang="ts">
	import { query, filtered_todos } from "$stores/filteringStore";
</script>

<template lang="pug">
	.mb-0.flex
		textarea#console.h-6.text-primary.text-14.w-80.flex.items-start.px-2(
			autocorrect="off",
			bind:value!="{ $query }",
			resize="noresize",
			style="resize: none"
		)
		+if('$query.length >= 1')
			.ml-6 { $filtered_todos.length } results
</template>
