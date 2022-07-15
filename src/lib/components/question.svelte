<script>
	export let id;
</script>

<a class="group relative no-underline" href={'#' + id}>
	<span class="absolute group-hover:opacity-50 opacity-0 transition-opacity top-[1.5px] -left-4 text-xl">#</span
	>
	<h3 {id} class="text-black"><slot /></h3>
</a>
