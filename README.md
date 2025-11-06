# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Creation

```bash
npx nuxi init timer-nuxt

# Instructions to add Vuetify: https://nuxt.com/modules/nuxt-vuetify
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## === Upgrade Performed on 11/6/2025 ===

```sh
# Check for outdated libraries
pnpm outdated
## `@invictus.codes/nuxt-vuetify` found to be deprecated

# Migrate to official Vuetify package
pnpm remove @invictus.codes/nuxt-vuetify
pnpm add -D vuetify-nuxt-module vuetify

# Update other packages to latest version
pnpm update --interactive --latest
## Note: Nuxt is upgrade from 3 to 4
```

### Summary of Changes (Version 3.0.0)

**Major upgrade from Nuxt 3 to Nuxt 4 with Vuetify migration:**

#### Package Updates (`package.json`)
- **Version bump:** 2.7.2 → 3.0.0
- **Nuxt:** 3.6.5 → 4.2.0
- **Cypress:** 13.2.0 → 15.6.0
- **Vuetify migration:** Removed abandoned `@invictus.codes/nuxt-vuetify` (0.3.0), added official `vuetify-nuxt-module` (0.18.8) and `vuetify` (3.10.9)

#### Configuration (`nuxt.config.ts`)
- Added explicit `defineNuxtConfig` import for Nuxt 4 compatibility
- Added `compatibilityDate: '2025-11-06'` for version compatibility
- Replaced `@invictus.codes/nuxt-vuetify` with `vuetify-nuxt-module`
- Removed deprecated `vuetify` configuration section (now uses module defaults)

#### Application Structure (`app.vue`)
- **Nuxt 4 migration:** Replaced `<RouterView />` with `<NuxtPage />`
- **Vuetify fix:** Wrapped layout in `<VApp>` component (required for Vuetify 3)
- Changed import to TypeScript type import: `import type { NavigationHookAfter }`
- Added fallback empty strings for optional properties to prevent undefined errors
- Restructured template with proper spacing (moved `pt-10` class to section)

#### Component Updates (`components/AppHeader/index.vue`)
- Updated Vuetify theme API: `theme.global.name.value` → `theme.change()` method
- Fixed switch alignment: Added `ml-auto` class for proper positioning

#### Page Improvements
- **benefits.vue:** Fixed invalid HTML nesting (removed `<p>` wrapper around `<h3>`)
- **index.vue:** Updated comments for clarity

All changes ensure compatibility with Nuxt 4 and the official Vuetify module while maintaining existing functionality.

