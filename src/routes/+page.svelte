<!-- Example Svelte Page / Starter Web Page-->
<script lang="ts">
	// eslint-disable-file @typescript-eslint/no-unused-vars, no-unused-vars
	// components

	import ButtonLink from "$atoms/ButtonLink.svelte";
	import Footer from "$atoms/Footer.svelte";
	import LogosGrid from "$molecules/LogosGrid.svelte";
	import PreFooter from "$atoms/PreFooter.svelte";

	// store
	import { brands } from "$stores/brandsStore";

	// logos to display
	$brands = [
		{ name: "Svelte", url: "https://svelte.dev/" },
		{ name: "Typescript", url: "https://www.typescriptlang.org/" },
		{ name: "TailwindCSS", url: "https://tailwindcss.com/" },
		{ name: "Pug", url: "https://pugjs.org/api/getting-started.html" },
	];
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
	main.relative.grid.min-h-screen.place-content-center.bg-primary.p-4.pb-48.text-white
		div(class="sm:max-w-lg lg:max-w-xl xl:max-w-2xl")
			.text-center(class="sm:text-left")
				//- headline
				h1.prose-xl.mb-3.font-semibold.text-accent
					| Toods
				div an experimental syntax for to-dos, inspired by Pug

				.mt-4
					.underline Syntax
					div categories: #cat1#cat2
					div due: ::20210101 ::tomorrow ::7d ::1w
					div tag: todo (default)
					div urgency: '&nbsp' = not; '+' = normal; '++' = high;
					div complexity: '&nbsp' = not; '-' = normal; '--' = high;
					div importance: '&nbsp' = not; '!' = normal; '!!' = high;

					div tags: .tag1.tag2

				.mt-4
					.underline Example
					div
						| #acme.web::1w! update widget design

				//- text
				ul.text-md.prose-base.mb-10.opacity-90(class="sm:mb-8")
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
