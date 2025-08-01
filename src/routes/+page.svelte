<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Counter from '$lib/components/Counter.svelte';
	import DisplayName from '$lib/components/DisplayName.svelte';
	import RandomNumber from '$lib/components/RandomNumber.svelte';

	import { AlarmClock, Search } from 'lucide-svelte';
	let button: Button;
	$effect(() => {
		button.getButton().focus();
	});
</script>

<!-- <DisplayName />

<RandomNumber />

<Counter /> -->

<div
	role="presentation"
	onclickcapture={(e) => {
		e.stopPropagation();
		console.log('Event coming from div');
	}}
>
	<Button
		href={'https://google.com'}
		bind:this={button}
		onclickcapture={(e) => {
			e.stopPropagation();
			console.log('Event coming from Button');
		}}
		onLeftHover={() => {
			console.log('Left hovered');
		}}
		size="sm"
		--buttonBgColor="yellow"
		--buttonTextColor="red"
		>{#snippet left(isHover: boolean)}
			{#if isHover}
				<Search />
			{:else}
				L
			{/if}
		{/snippet}
		Text
		{#snippet right(isHover: boolean)}
			{#if isHover}
				<AlarmClock />
			{:else}
				R
			{/if}
		{/snippet}
	</Button>
</div>

<style>
	/* :global(body) {
		background-color: red;
	} */
	:global(button) {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
