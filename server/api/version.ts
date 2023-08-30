// To call: /api/version
// https://nuxt.com/docs/guide/directory-structure/server
const { appVersion } = useAppConfig();

export default defineEventHandler((event) => {
  return {
    date: new Date().toUTCString(),
    version: appVersion,
  };
});
