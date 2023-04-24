<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context api
	import { setContext } from "svelte";

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

	// variables
	let style: string;

	// functions
	function toggleShowCompletedTodos() {
		$showCompletedTodos = !$showCompletedTodos;
	}
	function onClick(event: MouseEvent) {
		toggleShowCompletedTodos();
	}
</script>

<template lang="pug">
	+if('($breakpoint) === "mobile"')
		div mobile

		//-large
		+else
			+const('style="grid-template-columns: { $grid_template_columns };"')
			.gap-1.w-full.block.mb-0(
				class!="sm:gap-1 sm:w-full sm:grid text-[.85em] opacity-90",
				data-table-row,
				disabled,
				style!="{ style }"
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
					on:mousedown|stopPropagation!="{ toggleShowCompletedTodos() }"
				) ✔︎
</template>
