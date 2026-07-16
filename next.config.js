/** @type {import('next').NextConfig} */

// Deployed on Vercel (moved off GitHub Pages 2026-07-17 so the contact form can send
// server-side via Gmail SMTP). Dropped `output: 'export'` + basePath/assetPrefix: the
// site is served from the domain root, and /api/* needs a Node runtime that a static
// export cannot provide.
const nextConfig = {}

module.exports = nextConfig
