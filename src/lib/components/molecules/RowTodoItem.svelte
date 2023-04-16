<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// context api
	import { getContext, setContext } from "svelte";

	// svelte
	import { onMount } from "svelte";

	// components
	import CellComplete from "$molecules/CellComplete.svelte";
	import CellNext from "$molecules/CellNext.svelte";
	import CellIndex from "$molecules/CellIndex.svelte";
	import CellDue from "$molecules/CellDue.svelte";
	import CellDescription from "$molecules/CellDescription.svelte";
	import CellRating from "$molecules/CellRating.svelte";
	import CellTags from "$molecules/CellTags.svelte";

	// stores
	import { grid_template_columns } from "$stores/layoutStore";
	import { breakpoint } from "$stores/layoutStore";
	import { todos } from "$stores/todosStore";

	// utils
	import { tableUtils } from "$utils/tableUtils";

	// types
	import type { Readable, Writable } from "svelte/store";
	import { writable, readable, derived, get } from "svelte/store";
	import type { Todo } from "$types/todoTypes";
	import { stop_propagation } from "svelte/internal";
	type Row = HTMLButtonElement | HTMLDivElement | null;

	// * props
	export let row: Row;
	export let index: number; // position in filtered list

	// ** unique
	// unique id of the todo
	export let unique: string = "";

	// track todo state
	const editableTodo = $todos.find((todo) => todo.unique == unique);
	const readableTodo = derived(todos, ($todos) =>
		$todos.find((t: Todo) => t.unique == unique),
	);
	const initialTodo = JSON.parse(JSON.stringify(editableTodo));

	// pass on todo state via	context api
	setContext("todo_editable", editableTodo); // a direct reference to the to-do in the store
	setContext("todo_initial", initialTodo); // snapshots load state of todo
	setContext("todo_readable", readableTodo); // sent as a readable-only store
	setContext("unique", unique);
	setContext("index", index);

	// functions

	function onKeydown(event: KeyboardEvent) {
		const key = event.key;
		const Space = " ";

		interface Actions {
			[key: string]: () => void;
		}

		const action: Actions = {
			ArrowDown: () => tableUtils.goDownOneRow(row),
			ArrowLeft: () => tableUtils.goToPreviousRowLastFieldFromRow(row),
			ArrowRight: () => tableUtils.goToFirstFieldFromRow(row),
			ArrowUp: () => tableUtils.goUpOneRow(row),
			Enter: () => tableUtils.goDownOneRow(row),
		};

		if (action[key]) {
			action[key]();
			event.preventDefault();
		}
	}

	function onMousedown(event: MouseEvent) {
		event.stopPropagation();
	}
</script>

<template lang="pug">
	+if('($breakpoint) === "mobile"')
		//-small
		.mb-1.w-100(
			class!="sm:hidden",
			data-table-row,
			disabled,
			id!="todo-{unique}"
			)
			.grid.grid-cols-4.w-full.mb-1
				//-CellIndex
				//- CellNext
				//- CellDue
				//- CellDescription
				//- CellRating(data_handle="priority")
				//- CellRating(data_handle="friction")
				//- CellRating(data_handle="joy")
				//- CellTags

		//-large
		+else
			button.gap-1.w-full.block.rounded-sm.overflow-visible(
				bind:this!="{ row }"
				class!="sm:gap-1 sm:w-full sm:grid focus:ring-1 !ring-transparent outline-transparent outline-[1.5px] outline-offset-[1.5px] outline focus:outline-blue-300",
				data-table-row,
				id!="todo-{unique}"
				on:mousedown|stopPropagation!="{onMousedown}"
				on:keydown|stopPropagation!="{onKeydown}"
				style!="grid-template-columns: { $grid_template_columns };"
				)

				CellIndex(classes="text-[12px]")
				CellNext(classes="text-[18px]")
				CellDue(classes="text-[14px]")
				CellDescription(classes="text-[14px]")
				CellRating(data_handle="priority" classes="text-[14px]")
				CellRating(data_handle="friction" classes="text-[14px]")
				CellRating(data_handle="joy" classes="text-[14px]")
				CellTags(classes="text-[14px]")
				CellComplete(classes="text-[14px]")
</template>
