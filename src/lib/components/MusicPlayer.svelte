<!--
@component
Musicmancer 2023 Edition
-->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Button from '$lib/components/reusable/Button.svelte';
  import { formatSecondsToMMSS, loadSetting, saveSetting } from '$lib/client/util';
  import { clientConfig } from '$lib/client/config';
  import { parseBlob } from 'music-metadata';
  import { browser } from '$app/environment';
  import { t } from '$lib/client/localization';

  interface AudioMetadata {
    title: string;
    artist: string;
    album: string;
  }

  interface AudioData {
    src: string;
    audioElement: HTMLAudioElement;
    isEffect: boolean;
    metadata: AudioMetadata;
  }

  interface Props {
    musicUrlArray: string[];
    resetMusicButtonStyles: boolean;
  }

  let { musicUrlArray, resetMusicButtonStyles }: Props = $props();

  let currentAudioElement: HTMLAudioElement | undefined = $state(undefined);
  let generatedElements: HTMLButtonElement[] = [];
  let paused = $state(true);
  let muted = $state(false);
  let fadeInProgress = $state(false);
  let newPlayerAfterFade: HTMLAudioElement;
  let volume = $state(0);
  let audioDataArray: AudioData[] = [];
  let infoboxVisible = $state(false);
  let displayedMetadata: AudioMetadata | undefined = $state(undefined);

  // This runs before parent onMount, so the audio elements exist when user scripts run
  onMount(() => {
    volume = loadSetting('volume') || clientConfig.defaultVolume;
    initializeAudioElements();
  });

  onDestroy(() => {
    // Remove generated elements
    generatedElements.forEach((element) => element.remove());
    clearInterval(seekInterval);
    clearInterval(fadeOutInterval);
    if (browser) document.querySelector('#layout')?.classList.remove('bottom-padded');
  });

  const pauseOnEnded = () => {
    paused = true;
    currentAudioElement?.pause();
  };

  const play = async (index: number) => {
    if (!currentAudioElement) document.querySelector('#layout')?.classList.add('bottom-padded');

    const newAudioData = audioDataArray[index];
    if (currentAudioElement == newAudioData.audioElement) {
      if (paused) await unpause();
      else pause();
      return;
    }
    if (newAudioData.isEffect) {
      await newAudioData.audioElement.play();
    } else {
      // Play the selected audio file
      newAudioData.audioElement.currentTime = 0;
      newAudioData.audioElement.volume = volume / 100;
      newPlayerAfterFade = newAudioData.audioElement;
      generatedElements.forEach((e) => (e.disabled = true));
      // Others are faded out by the fadeout interval
      infoboxVisible = infoboxVisible ? !infoboxVisible : infoboxVisible;
      const waitUntilOthersFadedInterval = setInterval(async () => {
        fadeInProgress = true;
        if (!othersStillPlaying()) {
          currentAudioElement?.removeEventListener('ended', pauseOnEnded);
          currentAudioElement = newPlayerAfterFade;
          currentAudioElement.addEventListener('ended', pauseOnEnded);
          await (<HTMLAudioElement>currentAudioElement).play();
          paused = false;
          fadeInProgress = false;
          generatedElements.forEach((e) => (e.disabled = false));
          clearInterval(waitUntilOthersFadedInterval);
        }
      }, 100);
    }
  };

  const updateInfoBox = (audioSrc: string) => {
    for (const data of audioDataArray)
      if (data.src === audioSrc) {
        displayedMetadata = data.metadata;
        return;
      }
    displayedMetadata = {
      title: 'N/A',
      artist: 'N/A',
      album: 'N/A'
    };
  };

  const fetchFromUrl = async (audioTrackUrl: string): Promise<any> => {
    const response = await fetch(audioTrackUrl);
    if (response.ok) {
      return parseBlob(await response.blob());
    } else {
      throw new Error(`HTTP error status=${response.status}: ${response.statusText}`);
    }
  };

  const processMetadata = async () => {
    for (const audioData of audioDataArray) {
      try {
        const metadata = await fetchFromUrl(audioData.src);
        audioData.metadata.title = metadata.common.title ? metadata.common.title : 'N/A';
        audioData.metadata.artist = metadata.common.artist ? metadata.common.artist : 'N/A';
        audioData.metadata.album = metadata.common.album ? metadata.common.album : 'N/A';
        if (!currentAudioElement) continue;
        if (infoboxVisible && currentAudioElement?.src === audioData.src) {
          updateInfoBox(audioData.src);
        }
      } catch (error: any) {
        console.error(error.message);
        audioData.metadata.title = 'N/A';
        audioData.metadata.artist = 'N/A';
        audioData.metadata.album = 'N/A';
      }
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
      // Start preloading the audio
      audioElement.preload = 'auto';
      // Get data from audio element
      let audioSrc = audioElement.getAttribute('src');
      if (!audioSrc) return;
      if (audioSrc === '#auto') {
        audioSrc = musicUrlArray[autoIndex];
        autoIndex++;
      } else if (audioSrc[0] === '#') {
        audioSrc = musicUrlArray[parseInt(audioSrc.slice(1))];
      }
      audioSrc =
        audioSrc.includes('\r') || audioSrc.includes('\n')
          ? audioSrc.slice(0, audioSrc.length - 1)
          : audioSrc;
      audioElement.src = audioSrc;
      audioElement.volume = volume / 100;
      audioElement.currentTime = 0;
      audioElement.load();
      audioDataArray.push({
        src: audioSrc,
        audioElement: audioElement,
        isEffect: audioElement.classList.contains('effect'),
        metadata: {
          title: '',
          artist: '',
          album: ''
        }
      });

      // Create audio play button
      if (!audioElement.classList.contains('hidden') && !audioElement.hasAttribute('controls'))
        createAudioButton(audioElement, totalIndex);
      totalIndex++;
    });

    processMetadata();
  };

  const createAudioButton = (audioElement: HTMLAudioElement, index: number) => {
    const audioButton = document.createElement('button');
    generatedElements.push(audioButton);
    audioButton.classList.add('audio-button', `index-${index}`);
    if (resetMusicButtonStyles) audioButton.classList.add('minimal');

    // Button content
    let buttonContent = audioElement.dataset.content;
    audioButton.innerHTML = buttonContent
      ? `<span>${buttonContent}</span>`
      : '<span class="material-icons">music_note</span>';
    audioElement.removeAttribute('data-content');

    audioButton.addEventListener('click', () => play(parseInt(audioButton.classList[1].slice(6))));
    audioElement.after(audioButton);
    audioButton.appendChild(audioElement);
  };

  // Update the seek bar and current time as the audio plays
  let currentTime: HTMLTimeElement | undefined = $state(undefined);
  let seekBar: HTMLInputElement | undefined = $state(undefined);
  const seekInterval = setInterval(() => {
    if (currentAudioElement) {
      if (seekBar) seekBar.value = String(Math.floor(1000 * currentAudioElement.currentTime));
      if (currentTime) {
        // eslint-disable-next-line svelte/no-dom-manipulating
        currentTime.innerHTML = String(formatSecondsToMMSS(currentAudioElement.currentTime));
      }
    }
  }, 50);
  // Use the seek bar to seek the audio
  const handleSeek = (input: Event) => {
    const target = input.target as HTMLInputElement;
    if (currentAudioElement) currentAudioElement.currentTime = parseInt(target.value) / 1000;
  };

  // Update volume based on bar
  $effect(() => {
    audioDataArray
      .map((data) => data.audioElement)
      .forEach((element) => (element.volume = volume / 100));
  });

  // Save volume
  $effect(() => {
    if (volume) saveSetting('volume', volume);
  });

  // Mute
  $effect(() => {
    if (currentAudioElement) {
      if (muted) {
        currentAudioElement.volume = 0;
      } else {
        currentAudioElement.volume = volume / 100;
      }
    }
  });

  const unpause = async () => {
    if (currentAudioElement) {
      await currentAudioElement.play();
      paused = false;
    }
  };

  const pause = () => {
    paused = true;
    if (currentAudioElement) currentAudioElement.pause();
  };

  const fadeOutInterval = setInterval(() => {
    audioDataArray.map((audioData) => {
      if (audioData.isEffect || audioData.audioElement === newPlayerAfterFade) return;
      if (audioData.audioElement.volume > 0) {
        let customModifier = audioData.audioElement.dataset.fadeOutTime
          ? parseFloat(audioData.audioElement.dataset.fadeOutTime)
          : 1;
        let newVolume =
          audioData.audioElement.volume -
            (0.01 * clientConfig.musicFadeSpeed * (volume / 100)) / customModifier;
        if (newVolume < 0) newVolume = 0;
        audioData.audioElement.volume = newVolume;
      } else {
        if (audioData.audioElement.currentTime > 0) {
          audioData.audioElement.currentTime = 0;
          audioData.audioElement.pause();
        }
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
        <Button icon="play_arrow" disabled={fadeInProgress} onclick={unpause} />
      {:else}
        <Button icon="pause" disabled={fadeInProgress} onclick={pause} />
      {/if}
    </div>
    <time class="current-time" bind:this={currentTime}></time>
    <input
      class="seek-bar"
      disabled={fadeInProgress}
      type="range"
      bind:this={seekBar}
      min="0"
      max={Math.floor(1000 * currentAudioElement.duration)}
      oninput={handleSeek}
    />
    <time class="duration">{formatSecondsToMMSS(currentAudioElement.duration)}</time>
    <div>
      {#if !muted}
        <Button icon="volume_up" disabled={fadeInProgress} onclick={() => (muted = !muted)} />
      {:else}
        <Button icon="volume_mute" disabled={fadeInProgress} onclick={() => (muted = !muted)} />
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
    <div>
      <Button
        icon="info"
        disabled={fadeInProgress}
        onclick={() => {
          if (currentAudioElement) updateInfoBox(currentAudioElement.src);
          infoboxVisible = !infoboxVisible;
        }}
      />
    </div>
  </div>
  <table id="music-info-box" class={infoboxVisible ? '' : 'hidden'}>
    <tbody>
      <tr>
        <th colspan="3">{t.musicMetadata.title}</th>
      </tr>
      {#if displayedMetadata}
        <tr>
          <td class="material-icons">music_note</td>
          <td>{t.musicMetadata.songTitle}:</td>
          <td>{displayedMetadata.title}</td>
        </tr>
        <tr>
          <td class="material-icons">person</td>
          <td>{t.musicMetadata.artist}:</td>
          <td>{displayedMetadata.artist}</td>
        </tr>
        <tr>
          <td class="material-icons">album</td>
          <td>{t.musicMetadata.album}:</td>
          <td>{displayedMetadata.album}</td>
        </tr>
      {/if}
    </tbody>
  </table>
{/if}

<style>
  :global(.audio-button) {
    display: block;
    width: 4em;
    height: 4em;
    border: 1px solid var(--accent);
    border-radius: 2em;
    box-shadow: var(--music-button-shadow);
    background: var(--background-light);
    color: var(--text-light);
    margin: 2rem auto;
    font-size: inherit;

    :global(> span) {
      position: relative;
      top: 0.1rem;
      font-size: 2em;
    }

    &:disabled {
      color: var(--text-light);
      background-color: var(--hover-light);
    }

    &:hover {
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  :global(.audio-button.minimal) {
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: none;
    color: initial;
    transition: none;

    &:hover {
      color: initial;
      background: none;
    }
  }

  .audio-player {
    display: grid;
    grid-template-columns: 2rem 2.5rem 1fr 2.5rem 2rem 6rem 2rem;
    position: fixed;
    bottom: -2rem;
    left: 0;
    width: var(--viewport-width);
    height: 2rem;
    color: var(--text-dark);
    background-color: var(--accent);
    animation: audioPlayerSlideIn 500ms ease-out 10ms 1 normal forwards;
    z-index: var(--max-z-index);

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

  @keyframes audioPlayerSlideIn {
    from {
      bottom: -2rem;
    }
    to {
      bottom: 0;
    }
  }

  :global(#layout) {
    transition: padding-bottom 500ms ease-out;
  }

  :global(#layout.bottom-padded) {
    padding-bottom: 2rem;
  }

  table#music-info-box {
    width: auto;
    max-width: calc(var(--viewport-width - 2rem));
    background-color: var(--accent);
    position: fixed;
    right: 0rem;
    bottom: 2rem;
    color: var(--text-dark);
    padding: 0.5rem;
    box-shadow: var(--subtle-shadow);
    border-radius: var(--border-radius);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    z-index: calc(var(--max-z-index) - 1);
  }

  :global(#music-info-box td.material-icons) {
    font-size: 1rem;
    min-width: 0.5rem;
    padding-right: 0;
  }

  :global(#music-info-box tr:nth-child(2)) {
    height: 2rem;
    vertical-align: bottom;
  }

  :global(#music-info-box tr:nth-child(2) td.material-icons) {
    padding-top: 0.75rem;
  }

  :global(#music-info-box th) {
    text-align: center;
    border-bottom: 0.06rem solid var(--text-dark);
    padding-bottom: 0.25rem;
  }
</style>
