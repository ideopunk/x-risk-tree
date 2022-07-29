<script lang="ts">
	export let href: string;
</script>

<a
	class="text-green-theme hover:text-black transition-colors"
	{href}
	rel="external"
	target="_blank"
>
	<slot /></a
>
