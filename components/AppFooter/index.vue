<script setup lang="ts">
  import { version } from '~/package.json';
  const { SUPPORTED_URL_SEGMENTS } = useAppConfig();


  // === Computed Fields ===
  const footerLinks = Object.keys(SUPPORTED_URL_SEGMENTS)
    .filter((supportedUrlSegmentKey) => SUPPORTED_URL_SEGMENTS[supportedUrlSegmentKey]?.showInFooter)
    .map((supportedUrlSegmentKey) => ({
      key: supportedUrlSegmentKey,
      // Remove `/` from supportedUrlSegmentKey, e.g. /10-minute-timer
      url: supportedUrlSegmentKey.slice(1),
      urlDescription: SUPPORTED_URL_SEGMENTS[supportedUrlSegmentKey].appTitle,
    }));
</script>

<template>
  <!-- === Links to preset times === -->
  <VRow class="px-3 pt-10 pb-2">
    <VCol
      class="text-center py-1"
      cols="4"
      sm="3"
      md="2"
      v-for="footerLink in footerLinks"
      :key="footerLink.key"
    >
      <RouterLink
        :to="footerLink.url"
      >
        {{ footerLink.urlDescription }}
      </RouterLink>
    </VCol>
  </VRow>

  <VRow class="py-2">
    <VCol class="text-center">
      <RouterLink to="/" class="mx-2">Home</RouterLink>
      <RouterLink to="/benefits" class="mx-2">Benefits of Timer</RouterLink>
      <RouterLink to="/privacy" class="mx-2">Privacy Policy</RouterLink>
    </VCol>
  </VRow>

  <VRow>
    <VCol class="text-center">
      Brought to you by <a href="https://ivan-lim.com" target="_blank" class="mr-2">Ivan Lim</a>
      <small class="mx-2">© {{ new Date().getFullYear() }}</small>
      <small class="mx-2">🔖 {{ version }}</small>
    </VCol>
  </VRow>
</template>
