<!--
@component
Component for ID cell
#### *props:*
* prop - todo_id: number
#### *elements:*
* .field-container: outer container
* input.field-input: opacity 0 until focused
* .field-display: displays value of input

-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// stores
	import { breakpoint } from "$stores/layoutStore";

	// set data_handle
	setContext("data_handle", "id");

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputId from "$atoms/FieldInputId.svelte";
	import FieldDisplayText from "$atoms/FieldDisplayText.svelte";
	import FieldDisplayIdTile from "$atoms/FieldDisplayIdTile.svelte";

	// *
</script>

<template lang="pug">
	FieldContainer
		FieldInputId
		FieldDisplayText
</template>
