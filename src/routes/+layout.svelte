<script lang="ts">
	// css
	import "../app.css";

	// context
	import { setContext } from "svelte";

	// store
	import { window_w, window_h } from "$stores/windowStore";
</script>

<template lang="pug">
	svelte:window(
		bind:innerHeight!="{ $window_h }",
		bind:innerWidth!="{ $window_w }"
	)
	slot
</template>
