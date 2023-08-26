<script setup lang="ts">
  import { useTheme } from "vuetify";


  // === Composables ===
  const theme = useTheme();
  const userSelection = useUserSelection();
  const utility = useUtility(import.meta);


  // === Computed Fields ===
  const labelSwitch = computed(() => {
    // console.log(`[${utility.currentFileName}::computed::labelSwitch] userSelection.isDarkThemeSelected.value: `, userSelection.isDarkThemeSelected.value);

    return `${userSelection.isDarkThemeSelected.value ? 'Dark' : 'Light' } Theme`;
  });


  // === Watchers ===
  watch(userSelection.isDarkThemeSelected, (value) => {
    theme.global.name.value = value ? 'dark' : 'light';
  }, { immediate: true });


  // === Lifecycle Hooks ===
  onMounted(() => {
    // Change theme if user has selected a different one previously (which will be cached)
    // Note: Important to perform change here to avoid hydration warning
    const cachedIsDarkThemeSelected = cache.get(userSelection.cacheKeyIsDarkThemeSelected);
    if (cachedIsDarkThemeSelected) {
      userSelection.isDarkThemeSelected.value = cachedIsDarkThemeSelected === 'true';
    }
  });
</script>

<template>
  <VAppBar class="pl-5" density="compact">
    <AppHeaderTitle />

    <!-- Note: Removing unnecessary grid-template-areas for layout reason -->
    <!-- Note: With composable computed field, v-model is set to .value -->
    <VSwitch
      class="mr-5"
      inset
      style="grid-template-areas: none;"
      v-model="userSelection.isDarkThemeSelected.value"
      :label="labelSwitch"
    />
  </VAppBar>
</template>
