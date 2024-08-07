<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import { pushState, preloadData, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoadMore from './LoadMore.svelte';
	import Detail from './images/[id]/+page.svelte';
	import { get } from 'svelte/store';

	import { Button } from '$lib/components/ui/button';
	import { X, ArrowLeft, ArrowRight } from 'lucide-svelte';

	export let data;

	let images = data.images;
	let nextCursor = data.nextCursor;

	$: updateOnPropsChange(data);

	function updateOnPropsChange(data: { images: Array<{ public_id: string }>; nextCursor: any }) {
		images = data.images;
		nextCursor = data.nextCursor;
	}

	async function navigate(direction: number) {
		const nextIndex = get(page).state.index! + direction;
		if (nextIndex >= 0 && nextIndex < images.length) {
			const url = `/images/${images[nextIndex].public_id}`;
			const data = await preloadData(url);
			// @ts-ignore
			if (data.status === 200) {
				// @ts-ignore
				return pushState(url, { image: data.data.image, index: nextIndex });
			}
		}
	}
</script>

<svelte:head>
	<title>Homepage</title>
</svelte:head>

{#if $page.state.image}
	<div class="fixed inset-0 grid place-items-center p-4">
		<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
		<div class="fixed inset-0 z-0 bg-black/50 backdrop-blur" on:click={() => pushState('/', {})} />

		<div class="container relative z-10 max-w-6xl rounded-xl bg-white p-4 drop-shadow-xl">
			<div class="absolute -bottom-12 right-0 flex gap-4 md:bottom-4 md:right-4 md:top-4">
				{#if $page.state?.index !== undefined && $page.state.index > 0}
					<Button size="icon" variant="outline" on:click={() => navigate(-1)}>
						<ArrowLeft class="size-5" />
					</Button>
				{/if}
				{#if $page?.state?.index !== undefined && $page.state.index < images.length - 1}
					<Button size="icon" variant="outline" on:click={() => navigate(1)}>
						<ArrowRight class="size-5" />
					</Button>
				{/if}
				<Button on:click={() => pushState('/', {})} size="icon" variant="outline">
					<X class="size-5 " />
				</Button>
			</div>
			<Detail data={{ image: $page.state.image }} />
		</div>
	</div>
{/if}

<!-- Empty state of the gallery -->
{#if images.length === 0}
	<div class="text-center">
		<img
			src="/404.webp"
			alt="Scary Marcelline GIF"
			class="h-46 mx-auto mb-8 block aspect-auto rounded-lg"
		/>
		<h1 class="mx-auto max-w-xl text-4xl font-bold tracking-tighter">Marceline's Art Heist!</h1>
		<p class="mx-auto mt-4 max-w-xl text-gray-600">
			Oh no! It looks like Marceline has temporarily 'borrowed' all the artwork for her latest rock
			concert backdrop. Don't worry, we're negotiating their safe return! Check back soon to see if
			we've managed to reclaim our colorful treasures from the Vampire Queen's grasp.
		</p>
	</div>
{/if}

<div
	class="auto-cols-400 grid place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
	{#each images as { public_id }, index}
		{@const url = `/images/${public_id}`}
		<div>
			<a
				href={url}
				class="grid size-full place-items-center overflow-hidden rounded-md shadow-md ring-1 ring-neutral-950/5"
				on:click={async (event) => {
					try {
						event.preventDefault();
						const data = await preloadData(url);
						// @ts-ignore
						if (data.status === 200) {
							// @ts-ignore
							return pushState(url, { image: data.data.image, index });
						}
					} catch {}
					goto(url);
				}}
			>
				<CldImage src={public_id} width={400} height={400} />
			</a>
		</div>
	{/each}
</div>

{#if nextCursor}
	<LoadMore
		onLoad={async () => {
			const response = await fetch(`/api/images?next=${nextCursor}`);
			const { data, next_cursor } = await response.json();
			images = [...images, ...data];
			nextCursor = next_cursor;
		}}
	/>
{/if}
