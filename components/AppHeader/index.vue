<script setup>
  // import { computed, watch } from 'vue';
  // import { useTheme } from "vuetify";
  // import AppTitle from './AppTitle.vue';
  // import useUserSelection from '@/composables/useUserSelection.js';
  // import useUtility from '@/composables/useUtility.js';


  // === Composables ===
  // const theme = useTheme();
  // const userSelection = useUserSelection();
  // const utility = useUtility(import.meta);


  // === Computed Fields ===
  // const labelSwitch = computed(() => {
  //   // console.log(`[${utility.currentFileName}::computed::labelSwitch] userSelection.isDarkThemeSelected.value: `, userSelection.isDarkThemeSelected.value);

  //   return `${userSelection.isDarkThemeSelected.value ? 'Dark' : 'Light' } Theme`;
  // });


  // === Watchers ===
  // watch(userSelection.isDarkThemeSelected, (value) => {
  //   theme.global.name.value = value ? 'dark' : 'light';
  // }, { immediate: true });
</script>

<template>
  <VAppBar class="pl-5" density="compact">
    <AppHeaderTitle />

    <!-- Note: Removing unnecessary grid-template-areas for layout reason -->
    <!-- Note: With composable computed field, v-model is set to .value -->
    <!-- <VSwitch
      class="mr-5"
      inset
      style="grid-template-areas: none;"
      v-model="userSelection.isDarkThemeSelected.value"
      :label="labelSwitch"
    /> -->
  </VAppBar>
</template>
