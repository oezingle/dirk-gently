<script lang="ts">
	import { hoveredNode, nodeTransparency } from '$lib/util/stores';

	import { getPolygonSize, type Coordinate } from '../util/geometry';

	export let start: Coordinate;
	export let end: Coordinate;

	export let nodes: Array<string>;

	const { width, height } = getPolygonSize([{ x: 0, y: 0 }, start, end]);

	const getCenter = (pointA: Coordinate, pointB: Coordinate) => {
		return {
			x: (pointA.x + pointB.x) / 2,
			y: (pointA.y + pointB.y) / 2
		};
	};

	const center = getCenter(start, end);
</script>

<div style="opacity: {nodeTransparency($hoveredNode, ...nodes, `${nodes[0]}-${nodes[1]}`)}">
	<svg {height} {width}>
		<line
			x1={start.x}
			y1={start.y}
			x2={end.x}
			y2={end.y}
			style="stroke:rgb(0,0,0);stroke-width:2"
		/>
	</svg>
</div>

<style>
	svg {
		position: absolute;

		top: 0;
		left: 0;

		z-index: -1;
	}
</style>
