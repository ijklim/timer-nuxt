// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Bubblegum Sans&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Comic Neue&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Dai Banna SIL&display=swap' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@/assets/css/main.scss',
  ],
  devtools: { enabled: false },
});


