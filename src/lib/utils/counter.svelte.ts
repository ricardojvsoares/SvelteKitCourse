import { browser } from '$app/environment';

const storedCount = browser && localStorage.getItem('count');

const counter = $state(storedCount ? JSON.parse(storedCount) : { value: 0 });

$effect.root(() => {
	$effect(() => {
		localStorage.setItem('count', JSON.stringify(counter));
	});
});

export default counter;
