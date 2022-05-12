<!-- 
	TODO make everything but the hovered bubble transparent when hovering over a bubble.
	TODO Maybe use a context?
-->

<script lang="ts">
	import { generateNGon, type Coordinate } from '../util/geometry';
	import { objectMap } from '../util/object';

	import { auditWeb, type Web, type WebNode } from '../util/web';

	import Bubble from './Bubble.svelte';
	import Line from './Line.svelte';

	export let web: Web;

	$: web = auditWeb(web);

	const screenCoordinate = (point: Coordinate) => {
		// TODO center

		if (!element) throw new Error('Element not yet mounted');

		const divWidth = (element.clientWidth * 2) / 3;
		const divHeight = (element.clientHeight * 2) / 3;

		const pad = 10;

		const canvasWidth = divWidth - 2 * pad;
		const canvasHeight = divHeight - 2 * pad;

		const { x, y } = point;

		return {
			x: (x + 0.5) * canvasWidth + pad,
			y: (y + 0.5) * canvasHeight + pad
		};
	};

	let element: Element;

	let sides = Object.keys(web.nodes).length;

	let coordinates = generateNGon(sides);

	// Throw Ngon coordinates at object
	$: web.nodes = objectMap(web.nodes, (_: string, node: WebNode, index: number) => {
		return {
			...node,
			coordinate: coordinates[index]
		};
	});

	const getNodeCoordinate = (name: string) => {
		return screenCoordinate(web.nodes[name].coordinate);
	};
</script>

<div class="is-max" bind:this={element}>
	{#if element}
		{#each Object.values(web.nodes) as node}
			<Bubble coordinate={screenCoordinate(node.coordinate)} text={node.title} color={web.categories[node.category].color} />
		{/each}

		{#each web.edges as edge}
			<Line
				start={getNodeCoordinate(edge.start)}
				end={getNodeCoordinate(edge.end)}
				text={edge.description}
			/>
		{/each}
	{/if}
</div>

<style>
	.is-max {
		min-height: 100%;
		min-width: 100%;
	}
</style>
