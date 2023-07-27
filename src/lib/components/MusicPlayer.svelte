<!--
@component
Musicmancer 2023 Edition
-->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Button from '$lib/components/reusable/Button.svelte';
	import { formatSecondsToMMSS, loadSetting, saveSetting } from '$lib/util/util';
	import { DEFAULT_VOLUME, MUSIC_FADE_SPEED } from '$lib/config';
	import type { ChangeEvent } from 'react';

	interface AudioData {
		src: string;
		audioElement: HTMLAudioElement;
		isEffect: boolean;
	}

	export let musicUrlArray: string[] = [];

	let currentAudioElement: HTMLAudioElement | null;
	let generatedElements: HTMLButtonElement[] = [];
	let paused = true;
	let muted = false;
	let fadeInProgress = false;
	let newPlayerAfterFade: HTMLAudioElement;
	let volume = 0;
	let audioDataArray: AudioData[] = [];

	onMount(() => {
		volume = loadSetting('volume') || DEFAULT_VOLUME;
		initializeAudioElements();
	});

	onDestroy(() => {
		// Remove generated elements
		generatedElements.forEach((element) => element.remove());
		clearInterval(seekInterval);
		clearInterval(fadeOutInterval);
	});

	const play = (index: number) => {
		const newAudioData = audioDataArray[index];
		if (currentAudioElement == newAudioData.audioElement) {
			if (paused) unpause();
			else pause();
			return;
		}
		if (newAudioData.isEffect) {
			newAudioData.audioElement.play();
		} else {
			// Play the selected audio file
			newAudioData.audioElement.currentTime = 0;
			newAudioData.audioElement.volume = volume / 100;
			newPlayerAfterFade = newAudioData.audioElement;
			generatedElements.forEach((e) => (e.disabled = true));
			// Others are faded out by the fadeout interval
			const waitUntilOthersFadedInterval = setInterval(() => {
				fadeInProgress = true;
				if (!othersStillPlaying()) {
					currentAudioElement = newPlayerAfterFade;
					paused = false;
					fadeInProgress = false;
					(<HTMLAudioElement>currentAudioElement).play();
					generatedElements.forEach((e) => (e.disabled = false));
					clearInterval(waitUntilOthersFadedInterval);
				}
			}, 10);
		}
	};

	const initializeAudioElements = () => {
		let autoIndex = 0;
		let totalIndex = 0;
		const postContent = document.querySelector('#post-content');
		if (!postContent) return;
		const audioElements = postContent.querySelectorAll('audio');
		// Add a div.audio-button element next to the audio elements
		audioElements.forEach((audioElement) => {
			// Get data from audio element
			let audioSrc = audioElement.getAttribute('src');
			if (!audioSrc) return;
			if (audioSrc === '#auto') {
				audioSrc = musicUrlArray[autoIndex];
				autoIndex++;
			} else if (audioSrc[0] === '#') {
				audioSrc = musicUrlArray[parseInt(audioSrc.slice(1))];
			}
			audioElement.src = audioSrc;
			audioElement.volume = volume / 100;
			audioElement.currentTime = 0;
			audioElement.load();
			audioDataArray.push({
				src: audioSrc,
				audioElement: audioElement,
				isEffect: audioElement.classList.contains('effect')
			});

			// Create audio play button
			if (!audioElement.classList.contains('hidden') && !audioElement.hasAttribute('controls'))
				createAudioButton(audioElement, totalIndex);
			totalIndex++;
		});
	};

	const createAudioButton = (audioElement: HTMLAudioElement, index: number) => {
		const audioButton = document.createElement('button');
		generatedElements.push(audioButton);
		audioButton.classList.add('audio-button', `index-${index}`);
		audioButton.innerHTML = `<span class="material-icons">music_note</span>`;
		audioButton.addEventListener('click', () => play(parseInt(audioButton.classList[1].slice(6))));
		audioElement.after(audioButton);
	};

	// Update the seek bar and current time as the audio plays
	let currentTime: HTMLTimeElement;
	let seekBar: HTMLInputElement;
	const seekInterval = setInterval(() => {
		if (currentAudioElement) {
			seekBar.value = String(Math.floor(1000 * currentAudioElement.currentTime));
			currentTime.innerHTML = String(formatSecondsToMMSS(currentAudioElement.currentTime));
		}
	}, 50);
	// Use the seek bar to seek the audio
	const handleSeek = (input: ChangeEvent) => {
		currentAudioElement && (currentAudioElement.currentTime = input.target.value / 1000);
	};

	// Update volume based on bar
	$: audioDataArray
		.map((data) => data.audioElement)
		.forEach((element) => (element.volume = volume / 100));

	// Save volume
	$: volume && saveSetting('volume', volume);

	// Mute
	$: currentAudioElement &&
		(muted ? (currentAudioElement.volume = 0) : (currentAudioElement.volume = volume / 100));

	const unpause = () => {
		paused = false;
		currentAudioElement && currentAudioElement.play();
	};

	const pause = () => {
		paused = true;
		currentAudioElement && currentAudioElement.pause();
	};

	const fadeOutInterval = setInterval(() => {
		audioDataArray.map((audioData) => {
			if (audioData.isEffect || audioData.audioElement === newPlayerAfterFade) return;
			if (audioData.audioElement.volume > 0) {
				let newVolume = audioData.audioElement.volume - 0.001 * MUSIC_FADE_SPEED;
				if (newVolume < 0) newVolume = 0;
				audioData.audioElement.volume = newVolume;
			} else {
				audioData.audioElement.currentTime = 0;
				audioData.audioElement.pause();
			}
		});
	}, 10);

	const othersStillPlaying = () => {
		return (
			audioDataArray.filter((audioData) => {
				return (
					audioData.audioElement !== newPlayerAfterFade &&
					!audioData.isEffect &&
					!audioData.audioElement.paused
				);
			}).length > 0
		);
	};
</script>

{#if currentAudioElement}
	<div class="audio-player">
		<div>
			{#if paused}
				<Button icon="play_arrow" disabled={fadeInProgress} on:click={unpause} />
			{:else}
				<Button icon="pause" disabled={fadeInProgress} on:click={pause} />
			{/if}
		</div>
		<time class="current-time" bind:this={currentTime} />
		<input
			class="seek-bar"
			disabled={fadeInProgress}
			type="range"
			bind:this={seekBar}
			min="0"
			max={Math.floor(1000 * currentAudioElement.duration)}
			on:input={handleSeek}
		/>
		<time class="duration">{formatSecondsToMMSS(currentAudioElement.duration)}</time>
		<div>
			{#if !muted}
				<Button icon="volume_up" disabled={fadeInProgress} on:click={() => (muted = !muted)} />
			{:else}
				<Button icon="volume_mute" disabled={fadeInProgress} on:click={() => (muted = !muted)} />
			{/if}
		</div>
		<input
			class="volume-bar"
			disabled={fadeInProgress}
			type="range"
			min="0"
			max="100"
			bind:value={volume}
		/>
	</div>
{/if}

<style lang="scss">
	:global(.audio-button) {
		display: block;
		width: 4rem;
		height: 4rem;
		border: 1px solid var(--accent);
		border-radius: 2rem;
		box-shadow: var(--music-button-shadow);
		background: var(--background-light);
		color: var(--text-light);
		margin: auto;

		:global(> span) {
			position: relative;
			top: 0.1rem;
			font-size: 2rem;
		}

		&:disabled {
			color: var(--text-light);
			background-color: var(--hover);
		}

		&:hover {
			background-color: var(--hover);
			cursor: pointer;

			&:disabled {
				cursor: not-allowed;
			}
		}
	}

	.audio-player {
		display: grid;
		grid-template-columns: 2rem 2rem 1fr 2rem 2rem 6rem;
		position: fixed;
		bottom: 0;
		left: 0;
		width: var(--viewport-width);
		color: var(--text-dark);
		background-color: var(--accent);

		* {
			transition: var(--unfocus-speed) all linear;
		}

		> time {
			display: inline-block;
			text-align: center;
			line-height: 2rem;
		}

		> div {
			display: inline-block;
		}
	}
</style>
