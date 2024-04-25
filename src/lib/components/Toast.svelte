<script>
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import { notifications } from "../funcs/notification";

</script>

<div
	class="fixed bottom-2 right-4 my-auto  p-0 z-20 flex flex-col justify-center items-center pointer-events-none"
>
	{#each $notifications as notification (notification.id)}
		<div
			animate:flip
			class={`flex-auto w-40 text-center mb-2 ${notification.type === "default" ? "shadow-teal-800 shadow-md bg-green-theme" : "bg-red-500"}`}
			transition:fly|global={{ y: 40 }}
		>
			<div class="p-4 block text-lg text-black">{notification.message}</div>
		</div>
	{/each}
</div>
