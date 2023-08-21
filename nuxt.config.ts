// Nuxt Configuration: https://nuxt.com/docs/api/configuration/nuxt-config
// Vuetify Module: https://nuxt.com/modules/nuxt-vuetify
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Bubblegum Sans&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Comic Neue&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Dai Banna SIL&display=swap' },
      ],
    },
  },
  build: {
    // `analyze: true` creates files `.nuxt/analyze/*.html`
    analyze: false,
  },
  css: [
    '@/assets/css/main.scss',
  ],
  devServer: {
    port: 8800,
  },
  devtools: { enabled: false },
  extends: [
    '../nuxt-ads',
  ],
  modules: [
    '@invictus.codes/nuxt-vuetify',
  ],
  // `nitro` setting below allows usage of `import.meta`
  nitro: {
    esbuild: {
      options: {
        target: 'node18',
      },
    },
  },
  // Turn ssr to false during development for faster load time
  ssr: true,
  vuetify: {
    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      // styles: true | 'none' | 'expose' | 'sass' | { configFile: string },
      // autoImport: true | false,
      // useVuetifyLabs: true | false,
    }
  },
});
