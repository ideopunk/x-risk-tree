<script lang="ts">
	export let href: string;
</script>

<a sveltekit:prefetch {href} class="text-green-theme hover:text-black transition-colors font-bold"
	><slot /></a
>
