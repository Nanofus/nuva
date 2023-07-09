<!--
@component
Musicmancer 2023 Edition
-->
<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import Button from "$lib/components/reusable/Button.svelte";
  import { formatSecondsToMMSS } from "$lib/util";

  interface AudioData {
    src: string;
    audioElement: HTMLAudioElement;
    isEffect: boolean;
  }

  export let musicUrlArray: string[] = [];

  let currentAudioElement: HTMLAudioElement | null;
  let generatedElements: HTMLElement[] = [];
  let paused = true;
  let muted = false;
  let volume = 0;
  let audioDataArray: AudioData[] = [];

  onMount(() => {
    volume = loadVolume();
    initializeAudioElements();
  });

  onDestroy(() => {
    // Remove generated elements
    generatedElements.forEach((element) => element.remove());
    clearInterval(seekInterval);
  });

  let loadVolume = () => {
    if (browser) {
      if (localStorage.getItem("settings")) {
        return JSON.parse(localStorage.getItem("settings")).volume;
      }
    }
    return 0;
  };

  let saveVolume = (volume: number) => {
    if (browser) {
      const settings = JSON.parse(localStorage.getItem("settings"));
      settings.volume = volume;
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  };

  let play = (index: number) => {
    const newAudioData = audioDataArray[index];
    if (currentAudioElement == newAudioData.audioElement) {
      paused = !paused;
      return;
    }
    if (newAudioData.isEffect) {
      newAudioData.audioElement.play();
    } else {
      // Pause all other music files
      audioDataArray.forEach((audioData) => {
        if (audioData.isEffect || audioData == newAudioData) return;
        audioData.audioElement.currentTime = 0;
        audioData.audioElement.pause();
      });
      // Play the selected audio file
      currentAudioElement = newAudioData.audioElement;
      currentAudioElement.currentTime = 0;
      currentAudioElement.volume = volume / 100;
      paused = false;
      currentAudioElement.play();
    }
  };

  let initializeAudioElements = () => {
    let autoIndex = 0;
    let totalIndex = 0;
    const postContent = document.querySelector("#post-content");
    const audioElements = postContent.querySelectorAll("audio");
    // Add a div.audio-button element next to the audio elements
    audioElements.forEach((audioElement) => {
      // Get data from audio element
      let audioSrc = audioElement.getAttribute("src");
      if (audioSrc === "#auto") {
        audioSrc = musicUrlArray[autoIndex];
        autoIndex++;
      } else if (audioSrc[0] === "#") {
        audioSrc = musicUrlArray[audioSrc.slice(1)];
      }
      audioElement.src = audioSrc;
      audioElement.volume = volume / 100;
      audioElement.currentTime = 0;
      audioElement.load();
      audioDataArray.push({
        src: audioSrc,
        audioElement: audioElement,
        isEffect: audioElement.classList.contains("effect")
      });

      // Create audio play button
      if (!audioElement.classList.contains("hidden") && !audioElement.hasAttribute("controls")) createAudioButton(audioElement, totalIndex);
      totalIndex++;
    });
  };

  let createAudioButton = (audioElement: HTMLAudioElement, index: number) => {
    const audioButton = document.createElement("button");
    generatedElements.push(audioButton);
    audioButton.classList.add("audio-button", `index-${index}`);
    audioButton.innerHTML = `<span class="material-symbols-rounded">music_note</span>`;
    audioButton.addEventListener("click", () => play(parseInt(audioButton.classList[1].slice(6))));
    audioElement.after(audioButton);
  };

  // Update the seek bar and current time as the audio plays
  let currentTime: HTMLTimeElement;
  let seekBar: HTMLInputElement;
  let seekInterval = setInterval(() => {
    if (currentAudioElement) {
      seekBar.value = String(Math.floor(1000 * currentAudioElement.currentTime));
      currentTime.innerHTML = String(formatSecondsToMMSS(currentAudioElement.currentTime));
    }
  }, 100);
  // Use the seek bar to seek the audio
  let handleSeek = (input) => {
    currentAudioElement && (currentAudioElement.currentTime = input.target.value / 1000);
  };

  // Update volume based on bar
  $: currentAudioElement && (currentAudioElement.volume = volume / 100) && saveVolume(volume);

  // Pause and mute
  $: currentAudioElement && (paused ? currentAudioElement.pause() : currentAudioElement.play());
  $: currentAudioElement && (muted ? currentAudioElement.volume = 0 : currentAudioElement.volume = volume / 100);
</script>

{#if currentAudioElement}
  <div class="audio-player">
    <div>
      {#if paused}
        <Button icon="play_arrow" on:click={() => paused = !paused}></Button>
      {:else}
        <Button icon="pause" on:click={() => paused = !paused}></Button>
      {/if}
    </div>
    <time class="current-time" bind:this={currentTime}></time>
    <input class="seek-bar"
           type="range"
           bind:this={seekBar}
           min="0"
           max={Math.floor(1000 * currentAudioElement.duration)}
           on:input={handleSeek}
    />
    <time class="duration">{formatSecondsToMMSS(currentAudioElement.duration)}</time>
    <div>
      {#if !muted}
        <Button icon="volume_up" on:click={() => muted = !muted}></Button>
      {:else}
        <Button icon="volume_mute" on:click={() => muted = !muted}></Button>
      {/if}
    </div>
    <input class="volume-bar"
           type="range"
           min="0"
           max="100"
           bind:value={volume}>
  </div>
{/if}

<style lang="scss">
  :global(.audio-button) {
    display: block;
    width: 4rem;
    height: 4rem;
    border: 2px solid var(--accent-dark);
    border-radius: 2rem;
    background-color: var(--background-light);
    color: var(--text-light);
    margin: auto;

    :global(> span) {
      position: relative;
      top: 0.1rem;
      font-size: 2rem;
    }

    &:hover {
      background-color: var(--hover-dark);
      cursor: pointer;
    }
  }

  .audio-player {
    display: grid;
    grid-template-columns: 2rem 2rem 1fr 2rem 2rem 6rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    color: var(--text-dark);
    background-color: var(--accent-dark);

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