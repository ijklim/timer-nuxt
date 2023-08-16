<script setup lang="ts">
  const props = defineProps({
    color: {
      type: String,
      default: 'white',
    },
    label: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: 60,
    },
    min: {
      type: Number,
      default: 0,
    },
    thumbSize: {
      type: Number,
      default: 18,
    },
  });
</script>

<template>
  <!-- Sliders Doc: https://vuetifyjs.com/en/components/sliders -->
  <VSlider
    show-ticks="always"
    step="1"
    tick-size="1"
    :color="color"
    :label="label"
    :max="max"
    :min="min"
    :thumb-size="thumbSize"
  >
    <template #prepend>
      <VBtn
        icon="mdi-minus"
        size="x-small"
        :color="color"
        @click="$emit('decrement')"
      />
    </template>

    <template #append>
      <VBtn
        :color="color"
        icon="mdi-plus"
        size="x-small"
        @click="$emit('increment')"
      />
    </template>
  </VSlider>
</template>