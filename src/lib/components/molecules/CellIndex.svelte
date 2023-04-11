<!--
@component
Component for Index cell
#### *elements:*
* .field-container: outer container
* input.field-input: opacity 0 until focused
* .field-display: displays value of input

-->
<script lang="ts">
	// context
	import { setContext } from "svelte";

	// set data_handle
	setContext("data_handle", "index");

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputIndex from "$atoms/FieldInputIndex.svelte";
	import FieldDisplayText from "$atoms/FieldDisplayText.svelte";

	// props
	export let classes = "";
</script>

<template lang="pug">
	FieldContainer(classes!="{ classes }")
		FieldInputIndex
		FieldDisplayText
</template>
