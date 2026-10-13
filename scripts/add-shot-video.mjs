#!/usr/bin/env node
/**
 * Attach a looping video to a Playground shot.
 *
 *   npm run shot:video -- <dribbble-shot-id> <path-to-video-export>
 *
 * Dribbble's API does not expose shot videos, so motion comes from the original exports.
 * The clip is re-encoded with ffmpeg into a small, silent, web-ready H.264 MP4
 * (max 1600 px wide, fast start) at public/shots/<id>.mp4, and the shot's JSON gets
 * `"video": "shots/<id>.mp4"`. Requires ffmpeg (brew install ffmpeg).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [id, input] = process.argv.slice(2);

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!id || !input) fail('Usage: npm run shot:video -- <dribbble-shot-id> <path-to-video-export>');
if (!/^\d+$/.test(id)) fail(`The shot id must be a number, got "${id}".`);

const jsonPath = path.join('src/content/shots', `${id}.json`);
if (!existsSync(jsonPath)) fail(`No shot ${id} in src/content/shots. Run npm run sync:dribbble first.`);
if (!existsSync(input) || !statSync(input).isFile()) fail(`Video file not found: ${input}`);

try {
  execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
} catch {
  fail('ffmpeg is not installed. Install it with: brew install ffmpeg');
}

const outDir = 'public/shots';
const outFile = path.join(outDir, `${id}.mp4`);
mkdirSync(outDir, { recursive: true });

// Arguments are passed as an array (no shell), so file names with spaces or quotes are safe.
execFileSync(
  'ffmpeg',
  [
    '-y',
    '-hide_banner',
    '-loglevel', 'error',
    '-i', input,
    '-an',
    '-vf', "scale='min(1600,iw)':-2,fps=30",
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '26',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outFile,
  ],
  { stdio: 'inherit' },
);

const shot = JSON.parse(readFileSync(jsonPath, 'utf8'));
shot.video = `shots/${id}.mp4`;
writeFileSync(jsonPath, `${JSON.stringify(shot, null, 2)}\n`);

const mb = (statSync(outFile).size / 1024 / 1024).toFixed(1);
console.log(`Saved ${outFile} (${mb} MB) and linked it from ${jsonPath}.`);
if (Number(mb) > 6) console.warn('That is heavy for a looping card. Consider a shorter or smaller export.');
