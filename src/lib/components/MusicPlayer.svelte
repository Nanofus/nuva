<script lang="ts">
  import { onMount } from "svelte";

  export let musicArray: string[] = [];
  let audioFiles: {
    src: string;
    audioElement: HTMLAudioElement;
    isEffect: boolean;
  }[] = [];

  onMount(() => {
    replaceAudioElements();
    console.log(audioFiles);
  });

  let play = (index: number) => {
    console.log(index);
    const audioFile = audioFiles[index];
    if (audioFile.isEffect) {
      audioFile.audioElement.play();
    } else {
      // Pause all other audio files
      audioFiles.forEach((audioFile) => {
        if (audioFile.isEffect) return;
        audioFile.audioElement.pause();
      });
      // Play the selected audio file
      audioFile.audioElement.play();
    }
  };

  let replaceAudioElements = () => {
    let autoIndex = 0;
    let totalIndex = 0;
    const postContent = document.querySelector("#post-content");
    const audioElements = postContent.querySelectorAll("audio");
    // Add a div.audio-button element next to the audio elements
    audioElements.forEach((audioElement) => {
      // Get data from audio element
      let audioSrc = audioElement.getAttribute("src");
      if (audioSrc === "#auto") {
        audioSrc = musicArray[autoIndex];
        autoIndex++;
      } else if (audioSrc[0] === "#") {
        audioSrc = musicArray[audioSrc.slice(1)];
      }
      audioElement.src = audioSrc;
      audioElement.load();
      audioFiles.push({
        src: audioSrc,
        audioElement: audioElement,
        isEffect: audioElement.classList.contains("effect")
      });

      // Create audio play button
      const audioButton = document.createElement("div");
      audioButton.classList.add(...["audio-button", `index-${totalIndex}`]);
      audioButton.innerHTML = "Play";
      audioButton.addEventListener("click", () => {
        play(parseInt(audioButton.classList[1].slice(6)));
      });
      audioElement.insertAdjacentElement("afterend", audioButton);
      totalIndex++;
    });
  };
</script>

<div class="music-player">

</div>

<style lang="scss">
  .music-player {
    position: fixed;
    bottom: 0;
    width: var(--article-max-width);
    height: 60px;
    background-color: red;
    margin: auto;
  }
</style>