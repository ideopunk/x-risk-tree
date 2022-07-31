<script lang="ts">
	export let value = '';
	export let id = '';
</script>

<input bind:value {id} on:input />
