<script setup lang="ts">
  const { appVersion, SUPPORTED_URL_SEGMENTS } = useAppConfig();


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
      <NuxtLink
        :to="footerLink.url"
      >
        {{ footerLink.urlDescription }}
      </NuxtLink>
    </VCol>
  </VRow>

  <VRow class="py-2">
    <VCol class="text-center">
      <NuxtLink to="/" class="mx-2">Home</NuxtLink>
      <NuxtLink to="/benefits" class="mx-2">Benefits of Timer</NuxtLink>
      <NuxtLink to="/privacy" class="mx-2" no-prefetch>Privacy Policy</NuxtLink>
    </VCol>
  </VRow>

  <VRow>
    <VCol class="text-center">
      Brought to you by <NuxtLink href="https://ivan-lim.com" target="_blank" class="mr-2" rel="noopener">Ivan Lim</NuxtLink>
      <small class="mx-2">© {{ new Date().getFullYear() }}</small>
      <small class="mx-2">🔖 {{ appVersion }}</small>
    </VCol>
  </VRow>
</template>
