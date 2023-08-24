// To call: /api/version
// https://nuxt.com/docs/guide/directory-structure/server
import { version } from '~/package.json';

export default defineEventHandler((event) => {
  return {
    date: new Date().toUTCString(),
    version,
  };
});
