<script lang="ts">
	import { tick, untrack } from 'svelte';

	let randomNumber = $state(Math.floor(Math.random() * 10));
	let doubleRandomNumber = $derived(randomNumber * 2);
	let history: number[] = $state([untrack(() => randomNumber)]);
	let historyPTag: HTMLParagraphElement;

	/**
	 * $effect.pre() acts before dom is updated
	 * tick().then() acts after dom is updated
	 */
	$effect.pre(() => {
		history.length;
		console.log(`Effect Pre: ${historyPTag?.innerText}`);
		tick().then(() => {
			console.log(`Effect Pre after tick: ${historyPTag?.innerText}`);
		});
		return () => {
			console.log('Pre Effect Cleanup');
		};
	});

	$effect(() => {
		history.length;
		console.log(`Effect: ${historyPTag.innerText}`);
		return () => {
			console.log('Effect Cleanup');
		};
	});
</script>

<h1>Random Number</h1>
<h2>RandomNumber: {randomNumber}</h2>

<h2>Double RandomNumber: {doubleRandomNumber}</h2>
<p bind:this={historyPTag}>History: {history}</p>
<button
	onclick={() => {
		randomNumber = Math.floor(Math.random() * 10);
		history.push(randomNumber);
	}}
	>New Random
</button>

<style>
</style>
