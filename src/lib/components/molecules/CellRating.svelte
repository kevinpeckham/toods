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

	// get todo_id
	const todo_id = getContext("todo_id");

	// components
	import FieldContainer from "$atoms/FieldContainer.svelte";
	import FieldInputRating from "$atoms/FieldInputRating.svelte";
	import FieldDisplayRating from "$atoms/FieldDisplayRating.svelte";

	// stores
	import { columns } from "$stores/columnsStore";

	// types
	import type { Column } from "$types/columnTypes";

	// props
	export let data_handle: string = "";

	// find column from data handle
	const colLookup = $columns.find((col: Column) => col.handle === data_handle);
	const column = data_handle && colLookup != undefined ? colLookup : null;

	// find symbol from column
	const symbol = column?.symbol ? column.symbol : "*";

	// pass down data handle and column via context
	setContext("symbol", symbol);
	setContext("data_handle", data_handle);
</script>

<template lang="pug">
	+if('todo_id >= -1')
		FieldContainer
			FieldInputRating
			FieldDisplayRating
</template>
