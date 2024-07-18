<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { Badge } from '$lib/components/ui/badge';

	export let data: any;
</script>

<div class="flex flex-col gap-4 md:flex-row">
	<div class="md:flex-1">
		<CldImage
			src={data.image.public_id}
			height={1000}
			width={1000}
			class="rounded-md shadow-md ring-1 ring-neutral-950/5"
		/>
	</div>

	<div class="md:flex-1">
		<div>
			<div class="font-bold">Description</div>
			<div class="flex gap-2">description goes here...</div>
		</div>

		<div class="mt-4">
			{#if data.image.tags}
				<div class="font-bold">Automatic Tags</div>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each data.image.tags as tag}
						<Badge variant="secondary">{tag}</Badge>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
