<script lang="ts">
	// css
	import "../app.css";

	// context
	import { setContext } from "svelte";

	// store
	import { window_w, window_h } from "$stores/windowStore";
	import { activeElement } from "$stores/activeElementStore";

	// types
	import type { Todo } from "$types/todoTypes";

	// local type
	interface Data {
		content: {
			todos: Todo[];
		};
	}

	// props
	export let data: Data;

	function onFocusIn(event: FocusEvent) {
		const target = event.target as HTMLElement;
		$activeElement = target ? target : null;
	}
</script>

<template lang="pug">
	svelte:window(
		bind:innerHeight!="{ $window_h }",
		bind:innerWidth!="{ $window_w }",
		on:focusin!="{ onFocusIn }"
	)
	slot
</template>
