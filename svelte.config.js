import adapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import("@sveltejs/kit").Config} */
const config = {
  extensions: ['.svelte'],
  preprocess: [sveltePreprocess()],
  kit: {
    adapter: adapter({
      maxDuration: 60
    })
  }
};

export default config;
