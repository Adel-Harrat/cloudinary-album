<script>
	import '../app.css';
	import { BookHeart, Upload } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { CldUploadWidget } from 'svelte-cloudinary';
</script>

<!-- nav bar -->
<div class="fixed top-0 w-full border-b bg-white">
	<div class="container flex h-16 items-center">
		<a href="/" class="flex items-center gap-2 text-slate-900 transition hover:text-purple-500">
			<BookHeart class="size-7" />
			<span class="text-xl font-bold tracking-tighter">Radjaa's Art</span>
		</a>

		<div class="ml-auto">
			<CldUploadWidget uploadPreset="unsigned_preset_1" let:open let:isLoading>
				<Button variant="secondary" on:click={open} disabled={isLoading}>
					<Upload class="mr-2 size-4" />
					Upload
				</Button>
			</CldUploadWidget>
		</div>
	</div>
</div>

<div class="container my-8 pt-16">
	<!-- container -->

	<slot></slot>
</div>
