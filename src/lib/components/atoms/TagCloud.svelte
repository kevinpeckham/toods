<!--
@component
Here's some documentation for this component.
-->

<script lang="ts">
	// stores
	import { tags } from "$stores/tagsStore";
	import { each } from "svelte/internal";
	import { query } from "$stores/filteringStore";

	let sorted: string[];

	const isTop5 = (index: number) => {
		return index <= 5;
	};

	function onClick(e: MouseEvent, tag?: string) {
		// update query
		const tag_proper = tag && tag[0] ? tag[0] : "";
		$query = $query == tag_proper ? "" : tag_proper;

		// update aria-pressed for this button
		const button = e.target as HTMLButtonElement;
		if ($query == tag_proper) button.setAttribute("aria-pressed", "true");
		else button.setAttribute("aria-pressed", "false");

		// update aria-pressed for all other buttons
		const buttons = document.querySelectorAll("[data-tag-button]");
		buttons.forEach((button) => {
			if (button != e.target) {
				button.setAttribute("aria-pressed", "false");
			}
		});
	}
</script>

<template lang="pug">
	.flex.flex-wrap.gap-x-2.justify-end.pr-1(class="")
		+each('$tags as tag, index')
			+if('isTop5(index)')
				button.cursor-pointer.py-1.px-2.border.rounded.border-1.text-14(
					class!="hover:text-accent hover:border-accent aria-pressed:border-accent aria-pressed:text-accent",
					aria-pressed="false",
					data-tag-button,
					on:click|stopPropagation!="{ (e) => {onClick(e, tag)} }"
				) { tag[0] }

		//- context menu
		.flex.items-center.justify-end.text-24.leading-none.ml-2 ⠇
</template>
