<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	// props
	export let url = "/#";
	//export let linkText = "test link";
</script>

<template lang="pug">
	a.pointer-events-auto.inline.whitespace-nowrap.underline.underline-offset-2(
		class="hover:text-accent focus:text-accent focus-visible:text-accent",
		href!="{ url }"
	)
		slot
</template>
