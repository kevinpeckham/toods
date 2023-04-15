<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// functions
	import { createAndFocusTodo } from "$utils/todoUtils";
</script>

<template lang="pug">
	button.w-6.h-6.flex.justify-center.items-center.ml-1.mt-4(
		class="bg-white/20 hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary ",
		on:click!="{() => {createAndFocusTodo()}}"
	) +
</template>
