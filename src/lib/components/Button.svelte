<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = (
		| (HTMLButtonAttributes & { href?: never })
		| (HTMLAnchorAttributes & { href: string })
	) & {
		left?: Snippet<[boolean]>;
		right?: Snippet<[boolean]>;
		children: Snippet;
		size?: 'sm' | 'lg';
		shadow?: boolean;
		onLeftHover?: () => void;
		/* 		bgColor?: string;
		textColor?: string; */
	};
	let {
		/* 		bgColor,
		textColor, */
		left,
		right,
		children,
		onLeftHover,
		size = 'sm',
		shadow = false,
		...props
	}: Props = $props();

	let isLeftHover: boolean = $state(false);
	let isRightHover: boolean = $state(false);
	let button: HTMLButtonElement | HTMLAnchorElement;

	export function focus() {
		button.focus();
	}
	export function getButton() {
		return button;
	}
</script>


<!-- 
{#snippet sum(a: number, b: number)}
	{#snippet bold(x: any)}
		<b>{x}</b>
	{/snippet}
	<span>{a}+{b} = {@render bold(a + b)}</span>
{/snippet}
 -->

<!--  style:--buttonBgColor={bgColor}
 style:--buttonTextColor={textColor} -->
<svelte:element
	this={props.href ? 'a' : 'button'}
	bind:this={button}
	{...props}
	class={{ sm: size === 'sm', lg: size === 'lg', shadow }}
>
	{#if left}
		<div
			role="presentation"
			class="left-content"
			onmouseenter={() => {
				onLeftHover?.();
				isLeftHover = true;
			}}
			onmouseleave={() => {
				isLeftHover = false;
			}}
		>
			{@render left?.(isLeftHover)}
		</div>
	{/if}
	{@render children()}

	{#if right}
		<div
			role="presentation"
			class="right-content"
			onmouseenter={() => {
				isRightHover = true;
			}}
			onmouseleave={() => {
				isRightHover = false;
			}}
		>
			{@render right?.(isRightHover)}
		</div>
	{/if}
</svelte:element>

<!-- {@render sum(2, 2)} -->
<style lang="scss">
	button {
		border: none;
		background-color: var(--buttonBgColor, #ff3e00);
		color: var(--buttonTextColor, #ffffff);
		padding: 0 20px;
		height: 45px;
		font-weight: bold;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
		&:hover {
			background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
		}
		&:active {
			background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
		}
		&.sm {
			height: 45px;
		}
		&.lg {
			height: 55px;
			font-size: 20px;
		}
		&.shadow {
			box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
		}
		.left-content {
			margin-inline-end: 10px;
		}
		.right-content {
			margin-inline-start: 10px;
		}
	}
</style>
