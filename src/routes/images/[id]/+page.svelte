<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;

	$: description = data.image.info.detection.captioning.data.caption;
	$: tags = data.image.tags;
	$: applyEffectFromProps(data);

	let effects: any[] = [];

	function applyEffectFromProps(data: any) {
		try {
			const parsedEffect = JSON.parse(data.image.context.custom.effect);
			effects.splice(0, effects.length);
			for (const effect of parsedEffect) {
				effects.push(effect);
			}
			effects = effects;
		} catch {}
	}

	function applyEffect(effect: any) {
		effects.push(effect);
		effects = effects;

		syncEffects(effects);
	}

	async function syncEffects(effects: any[]) {
		await fetch(`/api/images/apply-effects?id=${data.image.public_id}`, {
			method: 'POST',
			body: JSON.stringify(effects)
		});
	}
</script>

<svelte:head>
	<title>Details Art</title>
</svelte:head>

<div class="flex flex-col gap-4 md:flex-row">
	<div class="md:flex-1">
		<CldImage
			src={data.image.public_id}
			height={600}
			width={600}
			class="rounded-md shadow-md ring-1 ring-neutral-950/5"
			{effects}
		/>
	</div>

	<div class="mt-0 md:mt-8 md:flex-1">
		<!-- Description Section -->
		{#if description}
			<div>
				<div class="font-bold">Description</div>
				<div class="mt-2 flex gap-2 text-gray-600">
					{description}
				</div>
			</div>
		{/if}

		<!-- Tags Section -->
		{#if tags}
			<div class="mt-8">
				<div class="font-bold">Tags</div>
				<div class="mt-2 flex flex-wrap gap-2">
					{#each tags as tag}
						<Badge variant="secondary">{tag}</Badge>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Filters Sections -->
		{#if undefined}
			<div class="mt-8">
				<div class="font-bold">Available Filters</div>
				<div class="mt-2 flex flex-wrap gap-2">
					<Button on:click={() => applyEffect({ tint: '70:blue:green:purple' })}>Tint</Button>
					<Button on:click={() => applyEffect({ blur: '200' })}>Blur</Button>
					<Button on:click={() => applyEffect({ grayscale: true })}>Grayscale</Button>
					<Button on:click={() => applyEffect({ pixelate: true })}>Pixelate</Button>
				</div>
			</div>
		{/if}
	</div>
</div>
