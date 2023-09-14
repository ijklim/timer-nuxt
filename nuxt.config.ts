// Nuxt Configuration: https://nuxt.com/docs/api/configuration/nuxt-config
// Vuetify Module: https://nuxt.com/modules/nuxt-vuetify
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css?family=Bubblegum Sans&display=swap', onload: 'this.onload=null;this.rel="stylesheet"' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css?family=Comic Neue&display=swap', onload: 'this.onload=null;this.rel="stylesheet"' },
        { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css?family=Dai Banna SIL&display=swap', onload: 'this.onload=null;this.rel="stylesheet"' },
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
  // Serve localhost at specified port
  devServer: {
    port: 8800,
  },
  devtools: { enabled: false },
  // Internal project that supports Google and Amazon ads
  // 9/1/23 Not necessary to extend nuxt-ads, replaced by iframe
  // extends: [
  //   '../nuxt-ads',
  // ],
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
  // https://nuxt.com/docs/getting-started/configuration
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      appDomainName: process.env.APP_DOMAIN_NAME,
    },
  },
  // Turn ssr to false during development for faster load time
  // ssr: false,
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
