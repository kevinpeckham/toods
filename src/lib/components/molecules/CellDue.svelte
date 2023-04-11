<!--
@component
Component for date cell
#### *context:*
consumes "todo_id" from context api
sets "data_handle" to context api
#### *props:*
* prop - classes: string // default: ""
-->
<script lang="ts">
	// context
	import { setContext } from "svelte";

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputDate from "$atoms/FieldInputDate.svelte";
	import FieldDisplayDate from "$atoms/FieldDisplayDate.svelte";

	// props
	export let classes = "";

	// set data_handle
	setContext("data_handle", "due");
</script>

<template lang="pug">
	FieldContainer(classes!="{ classes }")
		FieldInputDate
		FieldDisplayDate
</template>
