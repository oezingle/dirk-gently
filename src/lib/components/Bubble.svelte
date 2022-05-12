<script lang="ts">
	export let size = 25;

	export let color = '#ff0000';

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
            console.log(name, value)
            node.style.setProperty(`--${name}`, value);
        });
	};
</script>

<div class="bubble" use:bindCSS={{ size: `${size}px`, color }} />

<style>
	.bubble {
		border-radius: 100%;
		border: 5px solid black;

        background: var(--color);

		height: var(--size);
		width: var(--size);

		position: absolute;
	}
</style>
