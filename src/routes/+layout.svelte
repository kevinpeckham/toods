<script lang="ts">
	// css
	import "../app.css";

	// context
	import { setContext } from "svelte";

	// store
	import { window_w, window_h } from "$stores/windowStore";

	// types
	import type { Todo } from "$types/todo";

	// local type
	interface Data {
		content: {
			todos: Todo[];
		};
	}

	// props
	export let data: Data;

	$: {
		// console.log(data.content.todos);
	}
</script>

<template lang="pug">
	svelte:window(
		bind:innerHeight!="{ $window_h }",
		bind:innerWidth!="{ $window_w }"
	)
	slot
</template>
