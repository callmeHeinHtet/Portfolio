// One-shot image optimizer: PNG -> WebP at sensible sizes for the showcase.
// Run with: node scripts/optimize-images.mjs

import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const IMG = (p) => path.join(ROOT, 'public', 'images', p)

// Phone-aspect projects render at max 280px wide; 2x retina = 560px.
// Desktop-aspect projects render at max 520px wide; 2x retina = 1040px.
// We add a small headroom for any future layout tweaks.
const targets = [
  { in: 'Splitr.png',   out: 'Splitr.webp',  width: 600,  quality: 85 },
  { in: 'Stay.png',     out: 'Stay.webp',    width: 600,  quality: 85 },
  { in: 'Chatbot.png',  out: 'Chatbot.webp', width: 1100, quality: 85 },
  { in: 'profile.jpg',  out: 'profile.webp', width: 800,  quality: 82 },
]

const fmt = (b) => `${(b / 1024).toFixed(0)} KB`

for (const t of targets) {
  const inPath = IMG(t.in)
  const outPath = IMG(t.out)
  try { await fs.access(inPath) } catch { console.log(`${t.in}  (skipped — already optimized)`); continue }
  await sharp(inPath)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 6 })
    .toFile(outPath)
  const before = (await fs.stat(inPath)).size
  const after = (await fs.stat(outPath)).size
  const saved = ((1 - after / before) * 100).toFixed(0)
  console.log(`${t.in}  ${fmt(before)}  →  ${t.out}  ${fmt(after)}   (-${saved}%)`)
}
