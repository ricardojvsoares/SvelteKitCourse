<script lang="ts">
	let firstName = $state('Ricardo');
	let lastName = $state('Soares');
	let fullName = $derived(`${firstName} ${lastName}`);

	let src = $state('http://picsum.photos/200/200');

	let username = $state('Riri');
	let bio = $derived(`Hello, <b>${username || 'teste'}</b> is me.`);

	$effect(() => {
		if (username || fullName) {
			console.log('User has username or full name');
		}
	});
</script>

<h1>Display Name</h1>
<button
	onclick={() => {
		console.log(`Full name: ${fullName}`);
	}}>Get Full Name</button
>
<input bind:value={username} />

<input
	bind:value={firstName}
	oninput={(e) => {
		console.log(`First name updated: ${firstName}`);
		firstName = e.currentTarget.value;
	}}
/>

<input bind:value={lastName} />

<img {src} alt="A photo of {username}" />
<h2>{username || fullName}</h2>
<p>{@html bio}</p>
