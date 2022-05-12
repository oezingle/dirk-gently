<script lang="ts">
	import { auditWeb, type Web } from '../util/web';

	import Bubble from './Bubble.svelte';

	export let web: Web;

	$: web = auditWeb(web);
</script>

<Bubble />

<div class="is-max">
	<div />
</div>

<style>
	.is-max {
		min-height: 100%;
		min-width: 100%;
	}
</style>
