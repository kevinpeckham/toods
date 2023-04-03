<script lang="ts">
	// css
	import "../app.css";

	// context
	import { setContext } from "svelte";

	// store
	import { window_w } from "$stores/windowStore";
</script>

<template lang="pug">
	svelte:window(bind:innerWidth!="{ $window_w }")
	slot
</template>
