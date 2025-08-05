<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/Button.svelte';
	import ClickToCount from '$lib/components/ClickToCount.svelte';
	import Counter from '$lib/components/Counter.svelte';
	import CurrencyConverter from '$lib/components/CurrencyConverter.svelte';
	import DisplayName from '$lib/components/DisplayName.svelte';
	import DoubleClickToCount from '$lib/components/DoubleClickToCount.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import RandomNumber from '$lib/components/RandomNumber.svelte';
	import Sheet from '$lib/components/sheet/Sheet.svelte';
	import generateNotifications from '$lib/utils/generate-notifications';
	import { on } from 'svelte/events';

	import { AlarmClock, Search } from 'lucide-svelte';
	import { createSubscriber, SvelteDate } from 'svelte/reactivity';
	/* let button: Button;
	$effect(() => {
		button.getButton().focus();
	});

	//Proxy
	const target = {
		firstName: 'Ricardo',
		lastName: 'Soares',
		occupations: [],
		get fullName() {
			return `${this.firstName} ${this.lastName}`;
		},
		set occupation(value: string) {
			console.log(`Adding: ${value}`);
			this.occupations.push(value);
		}
	};
	const handler = {
		get(target, prop) {
			return prop in target ? target[prop] : 'NA';
		},
		set(target, prop, value) {
			if (['firstName', 'lastName'].includes(prop)) {
				if (typeof value !== 'string') {
					throw new TypeError(`Property ${prop} must be a string.`);
				}
			}
			target[prop] = value;
			return true;
		}
	};
	const proxy = new Proxy(target, handler);
	proxy.firstName = 'ROCAR';
	console.log(proxy.firstName);

	//DEEP STATE REACTIVITY
	let array = $state([1, 2, 3, 4]);
	let objectArray = $state([{ id: 1 }, { id: 2 }]);
	let object = $state({
		firstName: 'Ricardo',
		lastName: 'Soares',
		address: {
			city: 'City',
			street: 'Street'
		}
	});
	console.log(array, objectArray, object);

	$effect(() => {
		console.log('object effect');
		console.log(object);
	});
	$effect(() => {
		console.log('object.firstName effect');
		console.log(object.firstName);
	});
	$effect(() => {
		console.log('object.address.city');
		console.log(object.address.city);
	});
	$effect(() => {
		console.log('array');
		console.log(array[0]);
	});
	$effect(() => {
		console.log('array.length');
		console.log(array.length);
	});

	$inspect(object).with(console.trace);
	$effect(() => {
		$inspect.trace();
		console.log(object.firstName);
		console.log(object.address.city);
	});

	let notifications = $state.raw(generateNotifications(3));

	let data = $state([
		[
			{ value: 'Item', bgColor: '#6aa84f', color: '#fff' },
			{ value: 'Price', bgColor: '#6aa84f', color: '#fff' },
			{ value: 'Quantity', bgColor: '#6aa84f', color: '#fff' },
			{ value: 'Total', bgColor: '#51803d', color: '#fff' }
		],
		[{ value: 'Milk' }, { value: '3' }, { value: '2' }, { value: '=MULTIPLY(B2,C2)' }],
		[{ value: 'Oats' }, { value: '4' }, { value: '1' }, { value: '=MULTIPLY(B3,C3)' }],
		[{ value: 'Honey' }, { value: '5' }, { value: '2' }, { value: '=MULTIPLY(B4,C4)' }],
		[{ value: 'Strawberries' }, { value: '2' }, { value: '2' }, { value: '=MULTIPLY(B5,C5)' }],
		[
			{ value: '', bgColor: '#b4a7d6' },
			{ value: '', bgColor: '#b4a7d6' },
			{ value: 'Total', bgColor: '#b4a7d6' },
			{ value: '=SUM(D2,D3,D4,D5)', bgColor: '#8e7eb6' }
		]
	]);

	let date = new SvelteDate();

	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}); */


	import scrollY from '$lib/utils/scroll-y.svelte';
</script>

<h1 style="position: fixed;top:100px">{scrollY.current}</h1>
<div style="height: 2000px;"></div>

<!-- 
<ClickToCount />

<DoubleClickToCount />


<p class="date">
	{date.getHours().toString().padStart(2, '0')}:{date
		.getMinutes()
		.toString()
		.padStart(2, '0')}:{date.getSeconds().toString().padStart(2, '0')}
</p>

<CurrencyConverter />

<Sheet bind:data />

<pre>{JSON.stringify(data, null, 4)}</pre>

<h1>Notification</h1>
<Button
	--buttonBgColor="blue"
	onclick={() => {
		notifications = generateNotifications(3);
	}}>Refresh</Button
>
<ul>
	{#each notifications as notification, index (notification.id)}
		<li>
			<Notification
				{notification}
				onremove={(id) => {
					notifications = notifications.filter((n) => n.id !== id);
				}}
			/>
		</li>
	{:else}
		<p>No notifications</p>
	{/each}
</ul>

<h2>{object.firstName}</h2>
<h2>{object.address.city}</h2>

<input bind:value={object.firstName} />
<input bind:value={object.address.city} />
<input bind:value={object.address.street} />
<p>{array}</p>
<button
	onclick={() => {
		array[1] = Math.floor(Math.random() * 10);
	}}>Add to array</button
>

<button
	onclick={() => {
		console.log($state.snapshot(object));
	}}
>
	Log</button
>

<DisplayName />

<RandomNumber />

<Counter />

<div
	role="presentation"
	onclickcapture={(e) => {
		e.stopPropagation();
		console.log('Event coming from div');
	}}
>
	<Button
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
 -->
<style>
	/* :global(body) {
		background-color: red;
	} */
	:global(button) {
		font-family: 'Courier New', Courier, monospace;
	}
</style>
