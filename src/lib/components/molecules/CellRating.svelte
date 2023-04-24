<!--
@component
Rating Cell
* This is a cell that displays a rating.
* The rating is stored in the todo object.
* The rating is displayed as a string of special characters.
#### *context:*
consumes "todo_id" from context api
-->
<script lang="ts">
	// context
	import { setContext, getContext } from "svelte";

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputRating from "$atoms/FieldInputRating.svelte";
	import FieldDisplayRating from "$atoms/FieldDisplayRating.svelte";

	// stores
	import { symbols } from "$stores/settings";

	// props
	export let data_handle = "";
	export let classes = "";

	const symbol = $symbols[data_handle] as string;

	// set data_handle
	setContext("data_handle", data_handle);
	setContext("symbol", symbol);
</script>

<template lang="pug">
	FieldContainer(classes!="{ classes }")
		FieldInputRating(classes="")
		FieldDisplayRating
</template>
