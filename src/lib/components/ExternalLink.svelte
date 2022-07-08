<script lang="ts">
	export let href: string;
</script>

<a class="text-green-forest hover:text-black transition-colors" {href} rel="external"> <slot /></a>
