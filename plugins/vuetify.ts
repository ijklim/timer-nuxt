import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// Vuetify Icon Fonts library, doc: https://vuetifyjs.com/en/features/icon-fonts/
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    ssr: true,
    theme: {
      // Using dark instead of light theme
      defaultTheme: 'dark',
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
