<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	import { colors } from "$stores/colorsStore";

	// variables
	let bgcolor: string;
	let style: string;
	let datum: { [key: number]: string };

	// functions
	function textColor(l: number) {
		return l / 10 >= 70 ? "#132139" : "white";
	}
</script>

<template lang="pug">
	.w-full.h-full.min-h-screen.bg-oxfordBlue.text-white.flex.justify-center.items-center
		.grid.grid-cols-2.place-items-center.place-content-start.gap-x-4
			div
				+each('Object.entries($colors.oxford) as datum, index')
					+const('bgcolor = datum[1]')
					+const('style = `background-color:${bgcolor}; color: white;`')
					.w-96.text-center.py-2.border-white.border(
						style!="{ style }"
					) oxford-{ datum[0] }
			div
				+each('Object.entries($colors.lemon) as datum, index')
					+const('bgcolor = datum[1]')
					+const('style = `background-color:${bgcolor}; color: white;`')
					.w-96.text-center.py-2.border-white.border(
						style!="{ style }"
					) lemon-{ datum[0] }
</template>
