<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputTags from "$atoms/FieldInputTags.svelte";
	import FieldDisplayTags from "$atoms/FieldDisplayTags.svelte";

	// props
	export let classes: string = "";

	// set data_handle
	setContext("data_handle", "tags");

	// *
</script>

<template lang="pug">
	FieldContainer(classes!="{ classes }")
		FieldInputTags
		FieldDisplayTags
</template>
