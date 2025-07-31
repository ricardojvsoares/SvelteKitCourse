<script lang="ts">
	let count = $state(0);
	let frequency = $state(1000);
	let paused = $state(false);

	$effect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (!paused) {
			interval = setInterval(() => {
				count += 1;
			}, frequency);
		}
		return () => {
			clearInterval(interval);
		};
	});
</script>

<h1>Counter</h1>
<h2>Frequency: {frequency}</h2>
<h2>Count: {count}</h2>
<button
	onclick={() => {
		count = 0;
		const _originalFrequency = frequency;
		frequency = 0;
		frequency = _originalFrequency;
	}}>Reset</button
>

<button
	onclick={() => {
		frequency *= 2;
	}}>Slower</button
>
<button
	onclick={() => {
		paused = !paused;
	}}>{paused ? 'Paused' : 'Play'}</button
>
<button
	onclick={() => {
		frequency /= 2;
	}}>Faster</button
>

<style>
</style>
