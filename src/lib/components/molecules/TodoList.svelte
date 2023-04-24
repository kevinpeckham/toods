<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// components
	import RowTodoItem from "$molecules/RowTodoItem.svelte";
	import RowHeadings from "$molecules/RowHeadings.svelte";

	// stores
	import { query } from "$stores/filteringStore";
	import { filtered_todos } from "$stores/filteringStore";
	import { todos, todos_sorted } from "$stores/todosStore";
	import type { Todo } from "$types/todoTypes";
	import { showCompletedTodos } from "$stores/settings";

	// variables
	let todo: Todo;
	let index: number;
</script>

<template lang="pug">
	.w-full(data-table)
		//- headings row
		.grid.grid-cols-1.gap-y-0.overflow-visible.px-2.pt-2(data-headings)
			RowHeadings

		//- Todos
		.grid.grid-cols-1.overflow-visible.px-2.py-2(
			class="gap-y-[6px]",
			style=""
		)
			+each('$todos_sorted as todo, index')
				+if('$query.length == 0 || ($filtered_todos.includes(todo.unique))')
					+if('($showCompletedTodos || !todo.completed)')
						RowTodoItem(
							index!="{ index }",
							todo!="{ todo }",
							unique!="{ todo.unique }"
						)
</template>
