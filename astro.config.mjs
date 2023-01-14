import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import partytown from "@astrojs/partytown";
import vercel from '@astrojs/vercel/serverless';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://mager.co',
	output: 'server',
	integrations: [
		mdx(),
		sitemap(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
});
