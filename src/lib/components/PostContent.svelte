<script lang="ts">
  import type { Post } from "$lib/util/types";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import MusicPlayer from "$lib/components/MusicPlayer.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { cleanGlobalScope, initGlobalScope, toastSettings } from "$lib/util/util";
  import { t } from "$lib/util/translations";
  import { localConfig } from "$lib/util/config";

  export let post: Post;
  let scriptElements: HTMLScriptElement[] = [];

  const setInitialLetter = () => {
    // Remove the userAgent check when Firefox supports initial-letter
    if (browser && !navigator.userAgent.match(/firefox|fxios/i) && post.initialLetter) {
      document.documentElement.style.setProperty("--initial-letter-size", "3.0");
      document.documentElement.style.setProperty("--initial-letter-padding", "0.5rem");
    }
  };

  const reportValidation = () => {
    if (!post.validationResult) return;
    if (!post.validationResult.valid) {
      console.error(
        `${post.validationResult.errorCount} ${
          post.validationResult.errorCount > 0
            ? t.components.postContent.errorsCountPlural
            : t.components.postContent.errorsCountSingular
        }`,
        post.validationResult.results[0].messages,
      );
      toast.push(t.components.postContent.validationError, toastSettings.error);
    } else {
      toast.push(t.components.postContent.noValidationError, toastSettings.success);
    }
  };

  const reportError = () => {
    toast.push(t.components.postContent.scriptError, toastSettings.error);
  };

  const createErrorReporter = () => {
    if (!browser) return;
    window.addEventListener("error", reportError);
  };

  const cleanErrorReporter = () => {
    if (!browser) return;
    window.removeEventListener("error", reportError);
  };

  const runUserScripts = async (script: string, scriptFiles: string[] = []) => {
    let finalScript = "";
    const scriptElement = document.createElement("script");
    const loadedScripts = await Promise.all(
      scriptFiles.map(async (fileUrl) => {
        const response = await fetch(fileUrl);
        return await response.text();
      }),
    );
    loadedScripts.forEach((loadedScript) => {
      finalScript += loadedScript;
    });
    finalScript += script;
    scriptElement.innerHTML = `window["${localConfig.globalObjectName}"].postScripts = () => {${finalScript}}; window["${localConfig.globalObjectName}"].postScripts();`;
    document.head.insertBefore(scriptElement, document.head.firstChild);
    scriptElements.push(scriptElement);
  };

  const runScripts = async () => {
    if (post.content.indexOf("<script>") === -1) {
      await runUserScripts(post.scripts, post.scriptFiles);
    }

    // Run JS in post content
    const doc = document.implementation.createHTMLDocument(); // Sandbox
    doc.body.innerHTML = post.content;
    [].map.call(doc.getElementsByTagName("script"), async (scriptTag: HTMLScriptElement) => {
      await runUserScripts(scriptTag.innerText);
    });
  };

  onMount(async () => {
    initGlobalScope();
    reportValidation();
    createErrorReporter();
    await runScripts();
    setInitialLetter();
  });

  const cleanScripts = () => {
    scriptElements.forEach((scriptElement) => {
      scriptElement.remove();
    });
  };

  onDestroy(() => {
    cleanScripts();
    cleanErrorReporter();
    cleanGlobalScope();
  });
</script>

{#if post.styles}
  <div id="post-style-container">{@html `<style>${post.styles}</style>`}</div>
{/if}
{#if !post.mobileFriendly}
  <div class="info-box error hidden-desktop">
    <span class="material-icons inline-icon">warning</span>
    {t.components.postContent.notMobileFriendly}
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
