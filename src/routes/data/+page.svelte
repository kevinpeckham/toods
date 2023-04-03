<!--
@component
Here's some documentation for this component.
-->
<script lang="ts">
	import { todos } from "$stores/todosStore";

	let json = JSON.stringify($todos, null, 2);

	// function to write json data to local file
	function writeDataToFile() {
		// create a new blob (html5 magic) that contains the data
		const blob = new Blob([json], { type: "text/plain" });

		const dateString = new Date().toISOString().slice(0, 10);

		console.log(dateString);

		// create a link for our script to 'click'
		const a = document.createElement("a");
		a.download = `${dateString}-toods_data_backup.json`;
		a.href = URL.createObjectURL(blob);
		a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(() => URL.revokeObjectURL(a.href), 1500);
	}
</script>

<template lang="pug">
	.relative.w-full.h-screen.flex.p-4
		textarea.w-full.h-full.p-4(bind:value!="{ json }")
		//- button to backup data to local file
		button.absolute.top-0.right-0.outline-1.text-black.outline-black.outline.mr-8.mt-4.p-2.z-10(
			on:click!="{ writeDataToFile }"
		) Backup Data
</template>
