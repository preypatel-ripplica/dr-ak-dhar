# Dr. A. K. Dhar website

Next.js App Router starter using TypeScript, plain CSS and CSS Modules, and npm.
The structure and static-export configuration follow the Dr. Tripti Raheja reference project.

## Development

Use Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks and production build

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The build exports a static website to `out/`, with trailing-slash URLs and unoptimized images.
Deploy `out/` to static hosting. `npm start` previews that folder on port 3000 and requires Python 3.

## Structure

- `app/`: routes, root layout, global styles, and CSS Modules.
- `components/`: shared UI components.
- `lib/`: shared utilities and site configuration.
- `public/images/`: local image assets.

Dependencies are updated from the reference project. ESLint runs through its standalone CLI.
CMS integrations, translations, analytics, and final site design can be added as needed.
