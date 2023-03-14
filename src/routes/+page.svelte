<script lang="ts">
	// eslint-disable-file @typescript-eslint/no-unused-vars, no-unused-vars
	// components
	import Footer from "$atoms/Footer.svelte";
	import PreFooter from "$atoms/PreFooter.svelte";
	import TodoList from "$molecules/TodoList.svelte";
</script>

<template lang="pug">
	//- head
	svelte:head
		title Svelte Pug Tailwind Typescript | Starter Template
		meta(
			content="A node starter template for the Svelte Preprocessed stack.",
			name="description"
		)

	//- body
	main.relative.min-h-screen.w-full.bg-primary.p-4.pb-48.text-white.max-w-screen.overflow-hidden
		.mb-8
			//- headline
			.flex.items-center.mb-4
				h1.mr-4.font-semibold.text-accent Toods
				.text-14 a compact, keyboard-oriented to-do list.

		//- todo list
		.mb-8
			TodoList

		//- cheat sheet
		//-details.my-4
			summary.underline Cheat Sheet
			section
				div categories: #cat1#cat2
				div due: ::20210101 ::tomorrow ::7d ::1w
				//div tag: todo (default)
				div urgency: '&nbsp' = low; '+' = norm; '++' = high;
				div complexity: '&nbsp' = low; '-' = norm; '--' = high;
				div importance: '&nbsp' = low; '!' = norm; '!!' = high;
				div tags: .tag1.tag2

				.mt-4
					.underline Example
					div
						| #acme.web::1w! update widget design
			//- text
			//-ul.text-md.prose-base.mb-10.opacity-90(class="sm:mb-8")
				li #test

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
