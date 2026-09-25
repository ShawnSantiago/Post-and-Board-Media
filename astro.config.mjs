// @ts-check
import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

// Read .env files as well as real environment variables.
const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), ''), ...process.env };

// Pages are pre-rendered to static HTML. Only /api/enquiry runs on the server.
// On Vercel (VERCEL=1 during builds) the Vercel adapter is used; everywhere
// else the site builds as a standalone Node server (`npm start`).
const adapter = process.env.VERCEL ? vercel() : node({ mode: 'standalone' });

// Only set `site` when a real, owned production domain is configured.
const siteUrl = env.SITE_URL?.trim() || undefined;

export default defineConfig({
  site: siteUrl,
  output: 'static',
  adapter,
  trailingSlash: 'never',
  build: { format: 'directory' },
  env: {
    schema: {
      SITE_URL: envField.string({ context: 'server', access: 'public', optional: true }),
      DEMO_OPPORTUNITIES: envField.boolean({ context: 'server', access: 'public', default: false }),
      ENQUIRY_WEBHOOK_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      ENQUIRY_EMAIL_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      ENQUIRY_EMAIL_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
