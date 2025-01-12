// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://mager.co',
    trailingSlash: 'always',
    markdown: {
        syntaxHighlight: 'shiki',
    },
});
