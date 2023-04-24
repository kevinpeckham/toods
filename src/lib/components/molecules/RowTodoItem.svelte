<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// svelte functions
	import { todos_counter } from "$stores/todosStore";
	import { afterUpdate, getContext, setContext } from "svelte";
	import { derived } from "svelte/store";

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
	import { todos, todos_sorted } from "$stores/todosStore";

	// utils
	import { tableUtils } from "$utils/tableUtils";
	import { moveArrayItemUp } from "$utils/arrayUtils";

	// types
	import type { Readable, Writable } from "svelte/store";
	import type { Todo } from "$types/todoTypes";
	type Row = HTMLButtonElement | HTMLDivElement | null;

	// props
	export let index: number; // position in filtered list

	// refs
	let row: Row;

	// variables
	export let unique: string;

	// editable todo -- a direct reference to the todo in the store
	let editableTodo: Todo | undefined;
	$: editableTodo = $todos.find((todo) => todo.unique == unique);

	// readable todo -- a derived store that is only readable
	const readableTodo = derived(todos, ($todos) =>
		$todos.find((t: Todo) => t.unique == unique),
	);

	// initial todo -- the todo as it was when the row was loaded
	let initialTodo: Todo | undefined;
	$: initialTodo = editableTodo
		? JSON.parse(JSON.stringify(editableTodo))
		: undefined;

	$: setContext("todo_editable", editableTodo);
	$: setContext("todo_readable", readableTodo); // sent as a readable-only store
	$: setContext("todo_initial", initialTodo);
	$: setContext("unique", unique);
	$: setContext("index", index);

	// functions
	function onKeydown(event: KeyboardEvent) {
		const key = event.key;
		const shift = event.shiftKey;
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

		if (!shift && action[key]) {
			action[key]();
			event.preventDefault();
		}

		//- moving row up
		else if (shift && key == "ArrowUp") {
			event.preventDefault();
			tableUtils.moveRow(unique, "up");
		}
		//- moving row down
		else if (shift && key == "ArrowDown") {
			event.preventDefault();
			tableUtils.moveRow(unique, "down");
		}
	}

	function onMousedown(event: MouseEvent) {
		event.stopPropagation();
	}
</script>

<template lang="pug">
	+key('unique')
		button.gap-1.w-full.block.rounded-sm.overflow-visible(
			class!="h-6 sm:gap-1 sm:w-full sm:grid focus:ring-1 !ring-transparent outline-transparent outline-[1.5px] outline-offset-[1.5px] outline focus:outline-blue-300",
			bind:this!="{row}"
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
