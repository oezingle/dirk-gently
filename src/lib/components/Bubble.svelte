<script lang="ts">
	import { hoveredNode, nodeTransparency } from '$lib/util/stores';

	import type { Coordinate } from '../util/geometry';

	export let size = 10;

	export let color = '#ff0000';

	export let text = '';

	export let coordinate: Coordinate;

	export let node: string;

	/**
	 * Set CSS variables dynamically for one object.
	 * Bind to an element using use:bindCSS={vars}
	 *
	 * @param element a svelte element
	 * @param vars an object of variable name and value pairs
	 */
	const bindCSS = (element: any, vars: Record<string, any>) => {
		setCSS(element, vars);

		return {
			update: (vars: Record<string, any>) => setCSS(element, vars)
		};
	};

	/**
	 * Set CSS variables for an element
	 * @param element
	 * @param vars
	 */
	const setCSS = (element: any, vars: Record<string, any>) => {
		Object.entries(vars).forEach(([name, value]) => {
			element.style.setProperty(`--${name}`, value);
		});
	};

	/*const mouseHover = () => {
		hoveredNode.set(node);

		console.log('Hovered Node', node);
	};

	const mouseUnHover = () => {
		hoveredNode.set(undefined);

		console.log('Unhovered Node', node);
	};*/
</script>

<div
	class="container"
	style="top: {coordinate.y}px; left: {coordinate.x}px; opacity: {nodeTransparency($hoveredNode, node)};"
>
	<p class="bubble" use:bindCSS={{ size: `${size}px`, color }} />
	<p class="description">{text}</p>
</div>

<style>
	.container {
		position: absolute;
	}

	.container > .bubble {
		border-radius: 100%;
		border: 2px solid black;

		display: block;
		width: 0;
		height: 0;

		background: var(--color);

		padding: var(--size);

		transform: translateY(-100%) translateX(-50%);

		z-index: 10;
	}

	.container > .description {
		position: relative;

		transform: translateX(-50%) translateY(-150%);
	}
</style>
