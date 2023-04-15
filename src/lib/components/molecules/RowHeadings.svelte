<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context api
	import { setContext } from "svelte";

	// components
	import CellComplete from "$molecules/CellComplete.svelte";
	import CellNext from "$molecules/CellNext.svelte";
	import CellId from "$components/molecules/CellIndex.svelte";
	import CellDue from "$molecules/CellDue.svelte";
	import CellDescription from "$molecules/CellDescription.svelte";
	import CellRating from "$molecules/CellRating.svelte";
	import CellTags from "$molecules/CellTags.svelte";

	// stores
	import { grid_template_columns } from "$stores/layoutStore";
	import { breakpoint } from "$stores/layoutStore";
	import { showCompletedTodos } from "$stores/settings";

	// types
	import type { Readable } from "svelte/store";

	// props
	export let todo: Todo = new Todo();

	// set context -- todo_id
	setContext("todo_id", todo.id);

	// types & classes
	import { Todo } from "$types/todoTypes";

	// functions
	function onClick(event: MouseEvent) {
		$showCompletedTodos = !$showCompletedTodos;
	}
</script>

<template lang="pug">
	+if('($breakpoint) === "mobile"')
		div mobile

		//-large
		+else
			.gap-1.w-full.block.mb-0(
				class!="sm:gap-1 sm:w-full sm:grid text-[.85em] opacity-90",
				data-table-row,
				disabled,
				style!="grid-template-columns: { $grid_template_columns };"
				)
				.pl-2 #
				.text-center !
				.pl-2 due
				.pl-2.truncate description
				.text-center +
				.text-center :
				.text-center ~
				.pl-2 tags
				button.text-center(
					on:mousedown|stopPropagation!="{()=> $showCompletedTodos = !$showCompletedTodos}",
				) ✔︎
</template>
