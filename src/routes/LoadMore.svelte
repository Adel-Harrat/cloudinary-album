<script lang="ts">
	import { Loader } from 'lucide-svelte';
	export let onLoad: () => any;

	function intersect(node: HTMLElement) {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					// call on load
					onLoad();
				}
			},
			{
				threshold: 0.5
			}
		);
		intersectionObserver.observe(node);

		return {
			destroy() {
				intersectionObserver.disconnect();
			}
		};
	}
</script>

<div class="my-8 flex items-center justify-center text-sm" use:intersect>
	<Loader class="mr-2 size-5 animate-spin" />
</div>
