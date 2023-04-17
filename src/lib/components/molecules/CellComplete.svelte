<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputCompleted from "$atoms/FieldInputCompleted.svelte";
	import FieldDisplayCheckboxMask from "$atoms/FieldDisplayCheckboxMask.svelte";

	// props
	export let classes = "";

	// set data_handle
	setContext("data_handle", "completed");
</script>

<template lang="pug">
	FieldContainer(classes!="{ classes }")
		FieldInputCompleted
		FieldDisplayCheckboxMask(
			classes="",
			symbol!="✔︎"
		)
</template>
