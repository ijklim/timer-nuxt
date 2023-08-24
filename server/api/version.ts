// To call: /api/version
// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler((event) => {
  return {
    date: new Date().toUTCString(),
    version: useAppConfig().appVersion,
  };
});
