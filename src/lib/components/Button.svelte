<script lang="ts">
</script>

<h1>Button</h1>
{#snippet sum(a: number, b: number)}
	{#snippet bold(x: any)}
		<b>{x}</b>
	{/snippet}
	<span>{a}+{b} = {@render bold(a + b)}</span>
{/snippet}

<button>Text</button>

{@render sum(2, 2)}
