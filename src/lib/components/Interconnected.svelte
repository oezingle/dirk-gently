<!-- 
	TODO make everything but the hovered bubble transparent when hovering over a bubble.
	TODO Maybe use a context?
-->
<script lang="ts">
	import { hoveredNode, nodeTransparency } from '$lib/util/stores';

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

		const divWidth = element.clientWidth;
		const divHeight = element.clientHeight;

		const pad = 10;

		const canvasWidth = (divWidth * 2) / 3 - 2 * pad;
		const canvasHeight = (divHeight * 2) / 3 - 2 * pad;

		const { x, y } = point;

		return {
			x: x * canvasWidth + pad + divWidth / 2,
			y: y * canvasHeight + pad + divHeight / 2
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

	const isAroundNode = (node: WebNode, mouse) => {
		const coordinates = screenCoordinate(node.coordinate);

		const BOX_SIZE = 20;

		if (
			coordinates.x - BOX_SIZE < mouse.x &&
			coordinates.y - BOX_SIZE < mouse.y &&
			coordinates.x + BOX_SIZE > mouse.x &&
			coordinates.y + BOX_SIZE > mouse.y
		) {
			return true
		}
	};

	const mouseMove = (event) => {
		const notHovering = Object.entries(web.nodes).map(([key, node]) => {
			const around = isAroundNode(node, event)

			if (around) hoveredNode.set(key)

			return around
		}).filter(Boolean).length === 0;

		if (notHovering) hoveredNode.set(undefined)
	};
</script>

<div class="is-max" bind:this={element} on:mousemove={mouseMove}>
	{#if element}
		{#each Object.entries(web.nodes) as [key, node]}
			<Bubble
				coordinate={screenCoordinate(node.coordinate)}
				text={node.title}
				color={web.categories[node.category].color}
				node={key}
			/>
		{/each}

		{#each web.edges as edge}
			<Line
				start={getNodeCoordinate(edge.start)}
				end={getNodeCoordinate(edge.end)}
				text={edge.description}
				nodes={[edge.start, edge.end]}
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
