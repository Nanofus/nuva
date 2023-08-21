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

  const reportValidation = () => {
    if (!post.validationResult) return;
    if (!Object.keys(post.validationResult).length) return;
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
        const script = await response.text();
        console.log(fileUrl + ", " + script);
        return script;
      }),
    );
    loadedScripts.forEach((loadedScript) => {
      finalScript += loadedScript;
    });
    finalScript += script;
    scriptElement.innerHTML = `window.nuvaGlobal.postScripts = () => {${finalScript}}; window.nuvaGlobal.postScripts();`;
    console.log(finalScript);
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
<section class="vertically-separated {post.initialLetter ? 'large-initial-letter' : ''}" id="post-content">
  {@html post.content}
</section>
<MusicPlayer musicUrlArray={post.music} resetMusicButtonStyles={post.resetMusicButtons} />

<style lang="scss">
  :global(section.large-initial-letter > p:first-child::first-letter) {
    float: left;
    font-size: var(--initial-letter-size);
    line-height: var(--initial-letter-line-height);
    margin-right: var(--initial-letter-margin);
  }
</style>
