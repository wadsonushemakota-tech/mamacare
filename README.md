# mamacare

Our website helps Zimbabwean women navigate their trimester period and promotes avoiding alcohol.

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Getting Started

Prerequisites: Node.js and npm installed.

```sh
# Clone the repository
git clone https://github.com/wadsonushemakota-tech/mamacare
cd mamacare

# Install dependencies
npm i

# Start the development server
npm run dev
```

## Project Structure

- `src/` contains application source code (components, pages, hooks)
- `public/` static assets
- `tailwind.config.ts` Tailwind configuration
- `vite.config.ts` Vite configuration

## Deployment

- Always-updating branch alias for `main`:
  - `https://mamacare-git-main-nust-enactus.vercel.app/`
- Use this link to preview the latest build after each push.
- Avoid single-deployment URLs with random suffixes (e.g., `-4h43jszmt-`) as they are immutable snapshots.

### Cache-busting tips
- Hard refresh: Windows `Ctrl+F5`, macOS `Cmd+Shift+R`.
- Add a cache buster: append a query string, e.g. `?t=1731348000`.
- Incognito window or DevTools → Network → "Disable cache" for quick verification.

### Currently live updates
- Donation popup and recent UI tweaks.
- ENACTUS left-side slider uses images `1.jpg` through `12.jpg` with 4s fade.
- Sign-in overlay: `Hie {User}, Welcome to Mama Care`.
- `index.html` dynamically sets `canonical` and `og:url` to the current `*.vercel.app` domain.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
