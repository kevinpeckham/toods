<!--
@component
Here's some documentation for this component.
-->

<script lang="ts">
	// components
	import CommandPalette from "$molecules/CommandPalette.svelte";
	import TodoList from "$molecules/TodoList.svelte";
	import ButtonAddTodo from "$atoms/ButtonAddTodo.svelte";

	//-import Footer from "$atoms/Footer.svelte";
	//-import PreFooter from "$atoms/PreFooter.svelte";

	// stores
	import {
		todos,
		todos_searchable_text,
		todos_counter,
		todos_sorted,
	} from "$stores/todosStore";
</script>

<template lang="pug">
	svelte:head
		title Toods | keyboard-oriented to-do list
		meta(
			content="Toods is a compact, keyboard-oriented to-do list.",
			name="description"
		)

	//- body
	main.relative.min-h-screen.w-full.bg-oxford-750.p-4.pb-48.text-white.max-w-screen.overflow-hidden
		//- headline
		.mb-8
			.flex.items-center.mb-2
				h1.mr-4.font-semibold.text-accent(class="text-lg") Toods
				.text-base a compact, keyboard-oriented to-do list.

		.mb-2
			CommandPalette
			//-div { JSON.stringify($todos) }
			//-div { JSON.stringify($todos_searchable_text) }

		.mb-8
			TodoList

		.mb-2
			ButtonAddTodo
		div test
</template>
