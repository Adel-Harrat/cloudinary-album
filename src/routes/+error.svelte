<script>
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Link } from 'lucide-svelte';
</script>

{#if $page.status === 404}
	<div class="text-center">
		<img
			src="/404.webp"
			alt="Scary Marcelline GIF"
			class="h-46 mx-auto mb-8 block aspect-auto rounded-lg"
		/>
		<h1 class="mx-auto max-w-xl text-4xl font-bold tracking-tighter">
			Oops! Marceline Ate This Art!
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-gray-600">
			Looks like our mischievous vampire queen Marceline has sucked the red out of this link! Don't
			worry, she's harmless (mostly). Why not float back to our gallery and feast your eyes on some
			art that hasn't been turned into a vampire yet?
		</p>
		<Button variant="default" href="/" class="mt-8">
			<Link class="mr-2 size-4" />
			Find Art Marceline Hasn't Eaten</Button
		>
	</div>
{:else if $page.status === 500}
	<div class="text-center">
		<img
			src="/404.webp"
			alt="Scary Marcelline GIF"
			class="h-46 mx-auto mb-8 block aspect-auto rounded-lg"
		/>
		<h1 class="mx-auto max-w-xl text-4xl font-bold tracking-tighter">
			Marceline's Jam Session Crashed Our Server!
		</h1>
		<p class="mx-auto mt-4 max-w-xl text-gray-600">
			Uh-oh! Looks like Marceline's bass playing was too intense for our poor server to handle. It's
			having a bit of a meltdown in the Nightosphere right now. Give us a moment to calm things
			down, and then try again. In the meantime, why not check out some art that survived the sonic
			boom?
		</p>
		<Button variant="default" href="/" class="mt-8">
			<Link class="mr-2 size-4" />
			Jam Out of Here</Button
		>
	</div>
{:else}
	<h1 class="text-center text-2xl font-bold">Error {$page.status}</h1>
	<p class="text-gray-600">An error occurred. Please try again later.</p>
{/if}
