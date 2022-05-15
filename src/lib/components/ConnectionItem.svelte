<script lang="ts">
    import {get as getStore} from 'svelte/store'
    
    import { hoveredNode, webStore } from '$lib/util/stores';

	import type { WebEdge, WebNode } from '$lib/util/web';

	export let edge: WebEdge;

    const getNode = (name: string): WebNode => {
        return getStore(webStore).nodes[name]
    }

    const mouseHandler = (nodeToSet: string) => {
        return () => hoveredNode.set(nodeToSet)
    }
</script>

<div class="box" on:focus={mouseHandler(`${edge.start}-${edge.end}`)} on:mouseover={mouseHandler(`${edge.start}-${edge.end}`)} >
    <b>{getNode(edge.start).title} & {getNode(edge.end).title}</b>
	<p>{edge.description}</p>
</div>

<style>
    div.box {
        border-radius: 10px;

        margin: 5px 5px 5px 5px;
        padding: 5px 5px 5px 5px;

        background: white;
    }
</style>