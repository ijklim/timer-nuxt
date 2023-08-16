<script setup lang="ts">
  import { useDisplay } from 'vuetify';


  // === Composables ===
  const display = useDisplay();
  const userSelection = useUserSelection();
</script>

<template>
  <!-- === Dropdown: Background Image Selection === -->
  <VRow>
    <VCol
      class="text-center mb-auto mx-auto"
      md="6"
      sm="8"
    >
      <!-- Note: VRow here arranges Select and Button on the same line -->
      <VRow class="px-5 px-sm-0">
        <VSelect
          label="Background Picture"
          variant="outlined"
          v-model="userSelection.backgroundImageFileSelected.value"
          :bg-color="userSelection.backgroundColorInputField.value"
          :density="display.mdAndUp.value ? 'comfortable' : 'compact'"
          :items="userSelection.BACKGROUND_IMAGE_FILES"
        >
        </VSelect>
      </VRow>
    </VCol>
  </VRow>
</template>