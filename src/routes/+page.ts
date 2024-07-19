export const load = async ({ fetch, depends }) => {
	depends('app:home-page-image-list');

	const response = await fetch('/api/images');
	const { data, next_cursor } = await response.json();
	return {
		images: data as Array<{ public_id: string }>,
		nextCursor: next_cursor
	};
};
