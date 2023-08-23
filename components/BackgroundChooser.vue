<script setup lang="ts">
  import { useDisplay } from 'vuetify';


  // === Composables ===
  const display = useDisplay();
  const userSelection = useUserSelection();


  // === Computed Fiels ===
  const backgroundImageItems = computed(() => {
    return userSelection.BACKGROUND_IMAGE_FILES
      .map((backgroundImageFile) => {
        // Note: No thumbnail for No Background Selected
        const urlThumbnail = userSelection.optionNoBackgroundSelected === backgroundImageFile
          ? new URL(`@/assets/img/blank.png`, import.meta.url).href
          : userSelection.getImageUrl(backgroundImageFile);
        return {
          title: backgroundImageFile,
          urlThumbnail,
          value: backgroundImageFile,
        }
      });
  });
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
        <!-- https://vuetifyjs.com/en/api/v-select/ -->
        <!-- Using `menu-props` to close menu when custom list item is clicked: https://vuetifyjs.com/en/api/v-select/#props-menu-props -->
        <!-- Note: Set `menu` to true to open dropdown by default, useful for testing -->
        <VSelect
          label="Background Picture"
          variant="outlined"
          v-model="userSelection.backgroundImageFileSelected.value"
          :bg-color="userSelection.backgroundColorInputField.value"
          :clearable="true"
          :density="display.mdAndUp.value ? 'comfortable' : 'compact'"
          :items="backgroundImageItems"
          :menu="false"
          :menu-props="{ closeOnContentClick: true }"
        >
          <template #item="{ item }">
            <VListItem
              @click="userSelection.backgroundImageFileSelected.value = item.value"
            >
              <div class="d-flex align-center">
                <img :src="item.raw.urlThumbnail" class="thumbnail" />
                <div>{{ item.title }}</div>
              </div>
            </VListItem>
          </template>
        </VSelect>
      </VRow>
    </VCol>
  </VRow>
</template>

<style scoped>
img.thumbnail {
  border-radius: 3px;
  height: 30px;
  margin-right: 10px;
  width: 40px;
}
</style>