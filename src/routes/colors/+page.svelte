<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	import { colors } from "$stores/colorsStore";

	function textColor(l: number) {
		return l / 10 >= 70 ? "#132139" : "white";
	}

	// const okchValues = Object.entries($colors.oxford);
	console.log($colors.oxford);
</script>

<template lang="pug">
	.w-full.h-full.min-h-screen.bg-oxfordBlue.text-white.flex.justify-center.items-center
		.grid.grid-cols-2.place-items-center.place-content-start.gap-x-4
			//- +each('values as l')
				.w-96.text-center.py-2.border-white.border(
					style!="background-color: oklch({l[0]/10}% 0.05 260); color: { textColor(l[0])};"
				) { l[0] } { l[1] }
			div
				+each('Object.entries($colors.oxford) as datum, index')
					.w-96.text-center.py-2.border-white.border(
							style!="background-color: {datum[1]}; color: white;"
						) oxford-{ datum[0] }
			div
				+each('Object.entries($colors.lemon) as datum, index')
					.w-96.text-center.py-2.border-white.border(
							style!="background-color: {datum[1]}; color: white;"
						) lemon-{ datum[0] }
</template>
