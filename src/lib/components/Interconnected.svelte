<script lang="ts">
	import { generateNGon, type Coordinate } from '$lib/util/geometry';

	import { auditWeb, type Web } from '../util/web';

	import Bubble from './Bubble.svelte';

	export let web: Web;

	$: web = auditWeb(web);

	const screenCoordinate = (point: Coordinate) => {
		if (!element) throw new Error('Element not yet mounted');

		const pad = 10;

		const canvasWidth = element.clientWidth - 2 * pad;
		const canvasHeight = element.clientHeight - 2 * pad;

		const { x, y } = point;

		return {
			x: (x + 0.5) * canvasWidth + pad,
			y: (y + 0.5) * canvasHeight + pad
		};
	};

	let element: Element;

	let sides = Object.keys(web.nodes).length;
</script>

<div class="is-max" bind:this={element}>
	{#if element}
		{#each generateNGon(sides) as coordinate}
			<Bubble coordinate={screenCoordinate(coordinate)} />
		{/each}
	{/if}
</div>

<!-- TODO screw this and switch to canvas -->

<style>
	.is-max {
		min-height: 100%;
		min-width: 100%;
	}
</style>
