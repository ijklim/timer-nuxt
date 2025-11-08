# Timer App

A minimalist countdown timer web application built with Nuxt 4 and Vuetify 3. Features a clean, responsive UI with customizable timer durations, sound notifications, background themes, and integrated ad support. Perfect for productivity, cooking, workouts, or any activity that benefits from a visual countdown.


## Commands

```bash
# Nuxt project creation
npx nuxi init timer-nuxt

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Build for Node.js server deployment (Vercel, Heroku, etc.)
# Creates server and client code, requires Node.js runtime
pnpm build

# Generate static site for static hosting (GitHub Pages, shared hosting, CDN)
# Pre-renders all routes to static HTML files
# Use this for deployment to shared hosting via SCP/FTP
pnpm generate

# Locally preview production build
pnpm preview

# Audit for security vulnerabilities in dependencies
pnpm audit

# Fix security vulnerabilities (auto-fix what's possible)
pnpm audit --fix
```

## Environment Variables (.env)

This project uses environment variables for configuration. Create a `.env` file in the project root:

```env
# Example .env file
NUXT_PUBLIC_ADS_URL=https://ads.ivan-lim.com
```

**⚠️ Important for Shared Hosting Deployment:**
- The `.env` file is **NOT** included in the git repository (listed in `.gitignore`)
- After deploying to shared hosting via GitHub Actions, **manually create `.env` on the server** with your production settings
- SSH into your server and create the file:
  ```bash
  ssh user@hostname
  cd /path/to/app
  nano .env
  # Add your production environment variables
  ```

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


## === GitHub Action Auto Deploy to Shared Hosting Server ===

* Ensure these secret names match the variables referenced in `.github/workflows/ssh-deploy.yml`

* In the repository, go to `Settings` > `Secrets and variables` > `Actions` > `Repository secrets` > `New repository secret`

  * SSH_HOST: Server hostname/IP

  * SSH_USERNAME: Your SSH username

  * SSH_KEY: Your private SSH key content (the entire key including headers)

  * SSH_PORT: SSH port number (default is 22)

  * SSH_DEPLOY_PATH: Path on host to copy files

* Create GitHub action file (e.g. `.github/workflows/ssh-deploy.yml`)
