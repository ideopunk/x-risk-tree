<div class="flex flex-col lg:flex-row px-8 lg:px-0  w-screen  justify-between pt-8 relative">
	<div class="flex justify-center   lg:w-1/3 ">
		<slot name="left" />
	</div>

	<div class="lg:w-2/3 pb-12 lg:pb-0 flex justify-center">
		<slot name="right" />
	</div>
</div>
