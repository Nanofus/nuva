<!--
@component
Musicmancer 2023 Edition
-->
<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Button from "$lib/components/reusable/Button.svelte";
  import { formatSecondsToMMSS, loadSetting, saveSetting } from "$lib/util/util";
  import { localConfig } from "$lib/util/config";
  import { fetchFromUrl } from "music-metadata-browser";


  interface AudioMetadata {
    ready: boolean;
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

  export let musicUrlArray: string[] = [];

  let currentAudioElement: HTMLAudioElement | null;
  let generatedElements: HTMLButtonElement[] = [];
  let paused = true;
  let muted = false;
  let fadeInProgress = false;
  let newPlayerAfterFade: HTMLAudioElement;
  let volume = 0;
  let audioDataArray: AudioData[] = [];
  let infoboxVisible = false;

  // This runs before parent onMount, so the audio elements exist when user scripts run
  onMount(() => {
    volume = loadSetting("volume") || localConfig.defaultVolume;
    initializeAudioElements();
  });

  onDestroy(() => {
    // Remove generated elements
    generatedElements.forEach((element) => element.remove());
    clearInterval(seekInterval);
    clearInterval(fadeOutInterval);
  });

  const pauseOnEnded = () => {
    paused = true;
    currentAudioElement?.pause();
  };

  const play = async (index: number) => {
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
      if (infoboxVisible) toggleInfobox();
      const waitUntilOthersFadedInterval = setInterval(async () => {
        fadeInProgress = true;
        if (!othersStillPlaying()) {
          currentAudioElement?.removeEventListener("ended", pauseOnEnded);
          currentAudioElement = newPlayerAfterFade;
          currentAudioElement.addEventListener("ended", pauseOnEnded);
          await (<HTMLAudioElement>currentAudioElement).play();
          paused = false;
          fadeInProgress = false;
          generatedElements.forEach((e) => (e.disabled = false));
          clearInterval(waitUntilOthersFadedInterval);
        }
      }, 10);
    }
  };

  const updateInfoBox = (audioSrc: string) => {
    const audioMetadata = ((src) => {
      for (const data of audioDataArray) if (data.src === src) return data.metadata;
    })(audioSrc);
    const infoBox = document.querySelector("#music-info-box");

    infoBox.innerHTML = '<tr><th colspan="3">Song metadata</th></tr>'
            + '<tr><td class="material-icons">music_note</td><td>Song title:</td><td>'
            + audioMetadata.title + "</td></tr>"
            + '<tr><td class="material-icons">person</td><td>Artist:</td><td>'
            + audioMetadata.artist + "</td></tr>"
            + '<tr><td class="material-icons">album</td><td>Album:</td><td>'
            + audioMetadata.album + "</td></tr>";
  }

  const processMetadata = async () => {
    for (const audioData of audioDataArray) {

      try {
        const metadata = await fetchFromUrl(audioData.src);
        audioData.metadata.ready = true;
        audioData.metadata.title = metadata.common.title ? metadata.common.title : "N/A";
        audioData.metadata.artist = metadata.common.artist ? metadata.common.artist : "N/A";
        audioData.metadata.album = metadata.common.album ? metadata.common.album : "N/A";
        if (!currentAudioElement) continue;
        if (infoboxVisible && currentAudioElement?.src === audioData.src) {
          updateInfoBox(audioData.src);
        }
      } catch(error) {
        console.error(error.message);
        audioData.metadata.ready = true;
        audioData.metadata.title = "N/A";
        audioData.metadata.artist = "N/A";
        audioData.metadata.album = "N/A";
      }

    }
  }

  const initializeAudioElements = () => {
    let autoIndex = 0;
    let totalIndex = 0;
    const postContent = document.querySelector("#post-content");
    if (!postContent) return;
    const audioElements = postContent.querySelectorAll("audio");
    // Add a div.audio-button element next to the audio elements
    audioElements.forEach((audioElement) => {
      // Start preloading the audio
      audioElement.preload = "auto";
      // Get data from audio element
      let audioSrc = audioElement.getAttribute("src");
      if (!audioSrc) return;
      if (audioSrc === "#auto") {
        audioSrc = musicUrlArray[autoIndex];
        autoIndex++;
      } else if (audioSrc[0] === "#") {
        audioSrc = musicUrlArray[parseInt(audioSrc.slice(1))];
      }
      audioElement.src = audioSrc;
      audioElement.volume = volume / 100;
      audioElement.currentTime = 0;
      audioElement.load();
      audioDataArray.push({
        src: encodeURI(audioSrc),
        audioElement: audioElement,
        isEffect: audioElement.classList.contains("effect"),
        metadata: {
          ready: false,
          title: "",
          artist: "",
          album: ""
        }
      });

      // Create audio play button
      if (!audioElement.classList.contains("hidden") && !audioElement.hasAttribute("controls"))
        createAudioButton(audioElement, totalIndex);
      totalIndex++;
    });

    processMetadata();
  };

  const createAudioButton = (audioElement: HTMLAudioElement, index: number) => {
    const audioButton = document.createElement("button");
    generatedElements.push(audioButton);
    audioButton.classList.add("audio-button", `index-${index}`);
    audioButton.innerHTML = `<span class="material-icons">music_note</span>`;
    audioButton.addEventListener("click", () => play(parseInt(audioButton.classList[1].slice(6))));
    audioElement.after(audioButton);
    audioButton.appendChild(audioElement);
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
  const handleSeek = (input: Event) => {
    const target = input.target as HTMLInputElement;
    currentAudioElement && (currentAudioElement.currentTime = parseInt(target.value) / 1000);
  };

  // Update volume based on bar
  $: audioDataArray
    .map((data) => data.audioElement)
    .forEach((element) => (element.volume = volume / 100));

  // Save volume
  $: volume && saveSetting("volume", volume);

  // Mute
  $: currentAudioElement &&
    (muted ? (currentAudioElement.volume = 0) : (currentAudioElement.volume = volume / 100));

  const unpause = async () => {
    if (currentAudioElement) {
      await currentAudioElement.play();
      paused = false;
    }
  };

  const pause = () => {
    paused = true;
    currentAudioElement && currentAudioElement.pause();
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
          (0.01 * localConfig.musicFadeSpeed * (volume / 100)) / customModifier;
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

  const toggleInfobox = () => {
    if (infoboxVisible) {
      document.querySelector("#music-info-box")?.classList.add("hidden");
      infoboxVisible = false;
    } else {
      document.querySelector("#music-info-box")?.classList.remove("hidden");
      infoboxVisible = true;
    }
  }

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
    <Button icon="info" disabled={fadeInProgress} on:click={() => {
      if (currentAudioElement) updateInfoBox(currentAudioElement.src);
      toggleInfobox();
    }} />
  </div>
  <table id="music-info-box" class="hidden"></table>
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
      background-color: var(--hover-light);
    }

    &:hover {
      background-color: var(--hover-light);
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  .audio-player {
    display: grid;
    grid-template-columns: 2rem 2rem 1fr 2rem 2rem 6rem 2rem;
    position: fixed;
    bottom: -2rem;
    left: 0;
    width: var(--viewport-width);
    color: var(--text-dark);
    background-color: var(--accent);
    animation: audioPlayerSlideIn 500ms ease-out 10ms 1 normal forwards;
    z-index: 9999;

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
    from {bottom: -2rem;}
    to   {bottom: 0;}
  }

  table#music-info-box {
    width: auto;
    background-color: var(--accent);
    position: fixed;
    right: 1rem;
    bottom: 4rem;
    color: var(--text-dark);
    padding: 0.5rem;
    box-shadow: var(--header-shadow);
    border-radius: var(--border-radius);
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
