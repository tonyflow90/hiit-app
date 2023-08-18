<script>
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';

	export let startAt = undefined;
	export let time = undefined;
	export let tick = 1000;

	let interval = undefined;
	let timer = tweened(0);

	onMount(() => {
		if (!time) interval = run();
		else {
			let timeInMs = Number(time.split(':')[0])*60*60+Number(time.split(':')[1])*60+Number(time.split(':')[2]);
			$timer = isNaN(timeInMs) ? 0 : timeInMs;
		}
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const run = () => {
		return setInterval(() => {
			if ($timer == 0 && startAt) $timer = Math.floor((new Date() - new Date(startAt)) / 1000);
			else if ($timer > 0 && startAt) $timer++;
			else $timer = 0;
		}, tick);
	};

	$: if (time) {
		$timer = Math.floor(new Date(time)) / 1000;
		clearInterval(interval);
	}

	$: seconds = Math.floor($timer > 60 ? $timer % 60 : $timer);
	$: minutes = Math.floor($timer > 60 ? ($timer / 60) % 60 : 0);
	$: hours = Math.floor($timer / 60 > 60 ? ($timer / 3600) % 60 : 0);
</script>

{#if !time && $timer === 0}
	<p>--:--:--</p>
{:else}
	{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds
		.toString()
		.padStart(2, '0')}
{/if}
