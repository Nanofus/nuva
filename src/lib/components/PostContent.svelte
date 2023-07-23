<script lang="ts">
  import type { Post } from "$lib/types";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import MusicPlayer from "$lib/components/MusicPlayer.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { cleanGlobalScope, toastThemes } from "$lib/util";
  import { initGlobalScope } from "$lib/util.js";

  export let post: Post;

  const setInitialLetter = () => {
    if (browser && !navigator.userAgent.match(/firefox|fxios/i) && post.initialLetter) { // TODO: Remove this when Firefox supports initial-letter
      document.documentElement.style.setProperty("--initial-letter-size", "3.0");
      document.documentElement.style.setProperty("--initial-letter-padding", "0.5rem");
    }
  };

  const validateContent = (htmlString: string) => {
    let doc = new DOMParser().parseFromString(`<div>${htmlString}</div>`, "text/html"); // TODO: Not strict enough, should use 3rd party library
    if (doc.querySelector("parsererror")) {
      console.error(doc.querySelector("parsererror")?.querySelector("div")?.innerHTML);
      toast.push("Virhe postauksen HTML:ssä. Katso konsolista lisätietoja.", toastThemes.error);
    }
  };

  const evaluateScripts = (script: string) => {
    try {
      // @ts-ignore
      (1, eval)(script);
    } catch (e) {
      console.error(e);
      toast.push("Virhe postauksen skripteissä. Katso konsolista lisätietoja.", toastThemes.error);
    }
  };

  onMount(() => {
    initGlobalScope();
    validateContent(post.content);

    // Eval magic to run scripts in the post
    // (1, eval) is a trick to make eval run in the global scope
    // TODO: Does not cleaning up the scope on navigation cause problems?
    if (post.content.indexOf("<script>") === -1) {
      evaluateScripts(post.scripts);
    }

    // Parse JS from post content and eval it
    const doc = document.implementation.createHTMLDocument(); // Sandbox
    doc.body.innerHTML = post.content;
    [].map.call(doc.getElementsByTagName("script"), (scriptTag: HTMLScriptElement) => {
      evaluateScripts(scriptTag.innerText);
    });

    setInitialLetter();
  });

  onDestroy(() => {
    cleanGlobalScope();
  });
</script>

{#if post.styles}
  <div id="post-style-container">{@html `<style>${post.styles}</style>`}</div>
{/if}
{#if !post.mobileFriendly}
  <div class="info-box error hidden-desktop"><span class="material-icons inline-icon">warning</span> Tämä postaus ei
    sovi mobiililla luettavaksi.
  </div>
{/if}
<section class="vertically-separated" id="post-content">
  {@html post.content}
</section>
<MusicPlayer musicUrlArray={post.music} />

<style lang="scss">
  :global(section > p:first-child::first-letter) {
    initial-letter: var(--initial-letter-size);
    -webkit-initial-letter: var(--initial-letter-size);
    margin-right: var(--initial-letter-padding);
  }
</style>
