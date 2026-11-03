# Opu Hasan: Motion Graphics Portfolio

An interactive 3D portfolio for a motion graphics designer, built with **React**, **TypeScript**, **Three.js** and **GSAP**. It has a scroll-animated 3D avatar, smooth scrolling, a project gallery with hover video previews, and a "Play With Me" chess page.

**All content lives in one file: [`src/data/portfolio.json`](src/data/portfolio.json).** Edit it, save, and the whole site updates. You don't need to touch any component code.

> The current content is **placeholder / dummy data**. Replace it with real details, projects and links before going live.

---

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
```

---

## Editing content (`src/data/portfolio.json`)

| Section | What it controls |
| --- | --- |
| `site` | Browser tab title, SEO description, navbar logo text, theme colours (`accentColor`, `highlightColor`, `backgroundColor`) |
| `profile` | Name, greeting, mobile photo, location, email, resume link, and the rotating hero titles (`headline.accent` / `headline.main`, up to 2 words each) |
| `loader` | Name shown on the loading screen and the scrolling marquee words |
| `about` | About section title and text |
| `services` | The two "What I Do" cards (title, subtitle, description, tool tags) |
| `experience` | Career timeline. `period` like `"2024 - Present"` shows **NOW**; `"2022"` shows the year |
| `projects` | Work gallery. `featured: true` shows on the home page, and all projects show on `/myworks`. `link` can be a URL or an internal path like `/play`. Leave empty for a non-clickable card |
| `techStack` | Toolkit section. A flat list that is arranged into a pyramid automatically |
| `socials` | Social links. Empty `url` hides a link. `showInSidebar` shows it in the left icon bar. Icons: `behance`, `dribbble`, `instagram`, `linkedin`, `vimeo`, `youtube`, `x`, `facebook`, `github`, `medium`, `email`, `website` |
| `callToAction` | "Play With Me" / "Hire Me" buttons. An empty `hire.url` falls back to LinkedIn, then email |
| `play` | Chess page: `enabled`, opponent name/label and engine depth (search strength) |
| `avatar` | The 3D character (see below) |

### Project images and videos

- Put images in `public/images/projects/` and reference them as `/images/projects/your-file.jpg`.
- Motion work looks best with a preview: put a short muted `.mp4`/`.webm` in `public/videos/` and set `"video": "/videos/your-clip.mp4"`. It plays when visitors hover the project card.
- The included `.svg` covers are generated placeholders.

### Profile photo

Replace `public/images/avatar.svg` or point `profile.photo` at your own image. It shows on mobile (where the 3D avatar is hidden) and on the chess page.

### 3D avatar (`avatar`)

| Key | Purpose |
| --- | --- |
| `enabled` | `false` turns off the 3D character (and its loading screen) entirely |
| `model` | Path to the model in `public/` |
| `encrypted` / `decryptionKey` | The bundled model is AES-encrypted. Set `encrypted: false` to load a plain `.glb` |
| `environmentMap`, `environmentIntensity` | HDR lighting for the model |
| `lights.keyColor`, `lights.keyIntensity`, `lights.screenColor` | Key light and monitor-glow light colours |
| `monitor.screenColor`, `monitor.glowColor` | Colour of the desk monitor and its flicker |
| `headTracking` | Whether the head follows the mouse |
| `camera.fov`, `camera.position`, `camera.zoom` | Framing of the character |

**Using your own model:** the scroll animations expect the same rig and object names as the bundled character (bones like `spine005`/`spine006`, the `screenlight` and `Plane004` monitor meshes, and the `introAnimation`, `typing`, `browup`, `Blink`, `key1`… clips). A model missing some of these will still load, but those animations will be skipped. To encrypt a new model:

```bash
cd public/models
node encrypt.cjs my-avatar.glb character.enc "my-secret-key"
```

Then set `avatar.decryptionKey` to the same key.

---

## Deploying

The project is set up for **Vercel** (`vercel.json` handles SPA routing). Import the repo in Vercel and deploy. No environment variables are needed.

---

## Credits & license

Based on the open-source [portfolio-website](https://github.com/red1-for-hek/portfolio-website) template (MIT). Released under the **MIT License**. See [LICENSE](LICENSE).
