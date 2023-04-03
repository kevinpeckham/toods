<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context api
	import { setContext } from "svelte";

	// svelte
	import { onMount } from "svelte";

	// components
	import CellNext from "$molecules/CellNext.svelte";
	import CellId from "$molecules/CellId.svelte";
	import CellDue from "$molecules/CellDue.svelte";
	import CellDescription from "$molecules/CellDescription.svelte";
	import CellRating from "$molecules/CellRating.svelte";
	import CellTags from "$molecules/CellTags.svelte";

	// stores
	import { grid_template_columns } from "$stores/layoutStore";
	import { breakpoint } from "$stores/layoutStore";

	// types
	import type { Readable } from "svelte/store";

	// props
	export let todo: Todo = new Todo();

	// set context -- todo_id
	setContext("todo_id", todo.id);

	// types & classes
	import { Todo } from "$types/todoTypes";
</script>

<template lang="pug">
	+if('($breakpoint) === "mobile"')
		//-small
		.mb-1.w-100(
			class!="sm:hidden",
			data-table-row,
			disabled,
			id!="todo-{todo.id}"
			)
			.grid.grid-cols-4.w-full.mb-1
				CellId
				//- CellNext
				//- CellDue
				//- CellDescription
				//- CellRating(data_handle="priority")
				//- CellRating(data_handle="friction")
				//- CellRating(data_handle="joy")
				//- CellTags

		//-large
		+else
			.gap-1.w-full.block.mb-1(
				class!="sm:gap-1 sm:w-full sm:grid",
				data-table-row,
				disabled,
				id!="todo-{todo.id}"
				style!="grid-template-columns: { $grid_template_columns };"
				)

				CellId
				CellNext
				CellDue
				CellDescription
				CellRating(data_handle="priority")
				CellRating(data_handle="friction")
				CellRating(data_handle="joy")
				CellTags
</template>
