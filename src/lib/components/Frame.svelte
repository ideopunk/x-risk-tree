<div class="flex flex-col lg:flex-row px-8 lg:px-0  w-screen justify-between relative">
	<div class="flex justify-center lg:w-1/3 ">
		<slot name="aside" />
	</div>
	<div class="lg:w-2/3 pb-12 flex justify-center">
		<slot name="main" />
	</div>
</div>
