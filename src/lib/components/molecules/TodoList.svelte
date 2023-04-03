<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// svelte functions
	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	// components
	import RowTodoItem from "$components/molecules/RowTodoItem.svelte";
	import Cell from "$components/molecules/CellNext.svelte";

	// stores
	import { todos, todosJSON } from "$stores/todoStore";
	import type { Todo } from "$types/todoTypes";
	import { columns, columnHandles } from "$stores/columnsStore";
	import { colors } from "$stores/colorsStore";
	import { next } from "$stores/nextStore";

	// refs
	let addTodoButton: HTMLButtonElement;
	let pseudoTable: HTMLDivElement;
	let lastRow: HTMLDivElement;

	// variables
	let consoleValue: string = "";
	let query: string = "";
	let filterColumn: string = "";
	let filtered: Todo[] = [];
	let sorted: Todo[] = [];

	// reactive
	// $: {
	// 	if (pseudoTable && pseudoTable.lastElementChild) {
	// 		lastRow = pseudoTable.lastElementChild as HTMLDivElement;
	// 	}
	// 	console.log(lastRow);
	// }

	// styling
	let lgColumnsGrid: string;
	$: lgColumnsGrid = $columns
		.sort((a, b) => {
			const a_bp = a.breakPointLG;
			const a_order = a_bp ? a_bp.order : 0;
			const a_order_num = typeof a_order === "string" ? parseInt(a_order) : 0;
			const b_bp = b.breakPointLG;
			const b_order = b_bp ? b_bp.order : 0;
			const b_order_num = typeof b_order === "string" ? parseInt(b_order) : 0;
			return a_order_num - b_order_num;
		})
		.map((column) => {
			const bp = column.breakPointLG;
			const w = bp ? bp.width + bp.widthUnit : "1fr";
			return w;
		})
		.join(" ");

	// $: {
	// 	console.log(lgColumnsGrid);
	// }

	let columnsGrid: string;
	$: columnsGrid = $columns
		.map((column) => column.width + column.widthUnit)
		.join(" ");

	// functions
	import { createTodo, ratingDisplay, ratingIncrement } from "$utils/todoUtils";

	// filtering
	function filter(todos: Todo[], query: string, column?: string) {
		return todos.filter((todo) => {
			//- if column is specified, only filter by that column
			if (column) {
				return JSON.stringify(todo[column]).toLowerCase().includes(query);
			}
			//- else, filter by all columns
			else {
				return JSON.stringify(todo).toLowerCase().includes(query);
			}
		});
	}

	// parse console input
	function parseConsole() {
		// 1. apply filter

		//- if input includes ':', assume it's a column query
		if (consoleValue.includes(":") && consoleValue.split(":")[0]) {
			// split into column and query
			const input = consoleValue.split(":");

			// get query
			const queryString = input[1];

			// if query is empty, return
			if (!queryString) {
				return;
			} else {
				query = queryString;
			}

			// get columns that match input
			const colSelector = input[0].toLowerCase();
			const allColsArray = $columnHandles.map((c) => c.toLowerCase());
			const colMatch = allColsArray.filter((c) => c.startsWith(colSelector));
			// console.log(JSON.stringify(colMatch));

			// if there are no matches, return
			if (colMatch.length === 0) {
				return;
			} else {
				filterColumn = colMatch[0];
			}

			// // const queryString = input[1];
			// const allHandlesLowerCase = $columnHandles.map((handle) =>
			// 	handle.toLowerCase(),
			// );
			// const find;

			// console.log(query, filterColumn);
		}
		//- else, assume it's a query for all columns
		else {
			query = consoleValue.replace(":", "");
			filterColumn = "";
		}

		// 2. perform action
		// console.log(filtered.length);
		//- if filtered results are exactly = 1, select that todo
		if (filtered.length === 1) {
			const todo = filtered[0];
			const todoId = todo.id;
			const todoElement: HTMLElement | null = document.getElementById(
				`todo-${todoId}`,
			);

			if (todoElement) {
				todoElement?.focus();
				todoElement.style.backgroundColor = "red";
			}
			//
		}
	}

	// filtered
	$: {
		filtered = filter($todos, query, filterColumn);
	}

	const baseCellClasses =
		"text-13 px-2 py-1 leading-none h-full flex items-center truncate bg-slate-50/20";

	function onKeydown(e: KeyboardEvent) {
		let lastTodoIndex: number;

		// combo key press (ctrl + k)
		if (e.metaKey && e.key === "k") {
			createTodo();

			//wait for the row to be created
			setTimeout(() => {
				const lastRow = pseudoTable.lastElementChild as HTMLElement;
				const lastRowDescription = lastRow.querySelector(
					"[data-field=description]",
				) as HTMLElement;
				console.log(lastRowDescription);
				lastRowDescription.focus();
			}, 20);
		}
	}
</script>

<template lang="pug">
	svelte:window(on:keydown!="{ onKeydown }")
	//- console
	.mb-8
		textarea#console.h-6.text-primary.text-14.w-80.flex.items-start.px-2(
			autocorrect="off",
			autofocus="",
			bind:value!="{ consoleValue }",
			on:input!="{ parseConsole }",
			resize="noresize",
			style="resize: none"
		)

	//- headings
	//-.grid.grid-cols-8.border-b.border-b-white.mb-2.pb-2.gap-1(
		style!="grid-template-columns: {columnsGrid}"
		)
			+each('$columns as column')
				.opacity-80(class="text-12")
					//- symbol
					.w-full.flex.items-center.mb-2.justify-center(class!="{column.symbol && column.displaySymbolInColHeading ? '' : 'opacity-0'}")
						.rounded-full.border.border-white.w-5.h-5.overflow-hidden.flex.justify-center.items-center.leading-none
							.leading-none.text-11 { column.symbol}
					//- label
					+if('column.handle == "description" || column.handle == "tags" || column.handle == "category"')
						.truncate.text-10.pl-2
							span(class="hidden lg:inline-block") { column.label }
							span(class="hidden sm:inline-block lg:hidden") { column.shortLabel }
							span(class="inline-block sm:hidden") { column.symbol }
						+else
							.truncate.text-10
								span(class="hidden lg:inline-block") { column.label }
								span(class="hidden sm:inline-block lg:hidden") { column.shortLabel }
								span(class="inline-block sm:hidden") { column.symbol }

	//- list of todos
	.table.w-full(
		bind:this!="{ pseudoTable }",
		data-table
	)
		+each('filtered as todo, todoIndex')
			+if('todo.completed != true')
				RowTodoItem(todo!="{ todo }")

	//- add todo button
	button.w-6.h-6.flex.justify-center.items-center.ml-1.mt-4(
		class="bg-white/20 hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary ",
		bind:this!="{ addTodoButton }",
		on:click!="{() => {createTodo()}}"
	) +
</template>
