<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputDescription from "$atoms/FieldInputDescription.svelte";
	import FieldDisplayText from "$atoms/FieldDisplayText.svelte";

	// props
	export let classes = "";

	// set data_handle
	setContext("data_handle", "description");
</script>

<template lang="pug">
	FieldContainer(classes!="{ classes }")
		FieldInputDescription
		FieldDisplayText
</template>
