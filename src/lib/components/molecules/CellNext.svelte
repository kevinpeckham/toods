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
	FieldContainer(classes!="{ classes }")
		FieldInputCheckbox
		FieldDisplayCheckboxMask(
			classes="",
			symbol!="!"
		)
</template>
