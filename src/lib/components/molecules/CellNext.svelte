<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context
	import { setContext } from "svelte";

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputCheckbox from "$atoms/FieldInputCheckbox.svelte";
	import FieldDisplayCheckboxMask from "$atoms/FieldDisplayCheckboxMask.svelte";

	// props
	export let classes = "";
	// set data_handle
	setContext("data_handle", "next");
</script>

<template lang="pug">
	FieldContainer(classes!="data-[next]:!bg-accent {classes}")
		FieldInputCheckbox(classes="!opacity-0")
		FieldDisplayCheckboxMask(
			classes="!opacity-100 !text-primary  outline-accent",
			symbol!="!"
		)
</template>
