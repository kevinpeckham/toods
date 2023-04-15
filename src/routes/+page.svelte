<script lang="ts">
	// eslint-disable-file @typescript-eslint/no-unused-vars, no-unused-vars
	// components
	import Footer from "$atoms/Footer.svelte";
	import PreFooter from "$atoms/PreFooter.svelte";
	import TodoList from "$molecules/TodoList.svelte";
	import ButtonAddTodo from "$components/atoms/ButtonAddTodo.svelte";

	import { todos } from "$stores/todosStore";

	// testing mutation via content api
	import {
		getAllIncompleteTodos,
		getTodoFromHygraph,
		upsertTodo,
	} from "$utils/graphQLUtils";
	// getAllIncompleteTodos();
	// getTodo("lg3po561-zpttps");
	// upsertTodo($todos[0]);
	// getTodoFromHygraph($todos[0]);
</script>

<template lang="pug">
	//- head
	svelte:head
		title Toods | keyboard-oriented to-do list
		meta(
			content="Toods is a compact, keyboard-oriented to-do list.",
			name="description"
		)

	//- body
	main.relative.min-h-screen.w-full.bg-primary.p-4.pb-48.text-white.max-w-screen.overflow-hidden
		.mb-8
			//- headline
			.flex.items-center.mb-2
				h1.mr-4.font-semibold.text-accent(class="text-lg") Toods
				.text-base a compact, keyboard-oriented to-do list.

		//- header

		//- todo list
		.mb-8
			TodoList
		//- button
		ButtonAddTodo

	//- pre-footer
	//-PreFooter(
		targetUrl="https://pugify.dev",
		title="convert HTML to pug"
		)
		svelte:fragment(slot="default") Also check out the ad-free HTML to Pug converter @ https://pugify.dev

	//- footer
	//- Footer(
	//- 	authorLink="https://fosstodon.org/@kevinpeckham",
	//- 	orgLink="https://lightningjar.com"
	//- )
	//- 	svelte:fragment(slot="author") Kevin Peckham
	//- 	svelte:fragment(slot="org") Lightning Jar
</template>
