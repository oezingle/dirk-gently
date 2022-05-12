<script lang="ts">
	import type { Coordinate } from '../util/geometry';

	export let size = 25;

	export let color = '#ff0000';

	export let text = 'Testing testing 123';

	export let coordinate: Coordinate = { x: 0, y: 0 };

	/**
	 * Set CSS variables dynamically for one object.
	 * Bind to an element using use:bindCSS={vars}
	 *
	 * @param node a svelte element
	 * @param vars an object of variable name and value pairs
	 */
	const bindCSS = (node: any, vars: Record<string, any>) => {
		setCSS(node, vars);

		return {
			update: (vars: Record<string, any>) => setCSS(node, vars)
		};
	};

	const setCSS = (node: any, vars: Record<string, any>) => {
		Object.entries(vars).forEach(([name, value]) => {
			node.style.setProperty(`--${name}`, value);
		});
	};
</script>

<div class="container" style="top: {coordinate.y}px; left: {coordinate.x}px;">
	<p class="bubble" use:bindCSS={{ size: `${size}px`, color }} />
	<p class="description">{text}</p>
</div>

<style>
	.container {
		position: absolute;
	}

	.container > .bubble {
		border-radius: 100%;
		border: 5px solid black;

		background: var(--color);

		padding: var(--size);
	}

	.container > .description {
		position: relative;
	}
</style>
