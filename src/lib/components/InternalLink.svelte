<script lang="ts">
	export let href: string;
</script>

<a data-sveltekit-preload-data {href} class="text-green-theme hover:text-black transition-colors font-bold"
	><slot /></a
>
