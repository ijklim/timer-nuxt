<script setup lang="ts">
  // import { computed } from 'vue';
  // import useUtility from '@/composables/useUtility.js';
  const { SECONDS_IN_A_MINUTE, SECONDS_IN_AN_HOUR } = useAppConfig();


  // === Composables ===
  const utility = useUtility(import.meta);


  // === Props ===
  const props = defineProps({
    timer: {
      type: Number,
      required: true,
    },
  });


  // === Computed Fields ===
  /**
   * Timer formatted for display purpose (hh:mm:ss)
   */
  const formattedTimer = computed(() => {
    let hours = Math.floor(props.timer / SECONDS_IN_AN_HOUR);
    let minutes = Math.floor((props.timer - (hours * SECONDS_IN_AN_HOUR)) / SECONDS_IN_A_MINUTE);
    let seconds = props.timer - (hours * SECONDS_IN_AN_HOUR) - (minutes * SECONDS_IN_A_MINUTE);
    // console.log(`[${utility.currentFileName}::formattedTimer()] hours, minutes, seconds:`, hours, minutes, seconds);

    // Pad numbers with 0
    return [
      ('0' + hours).slice(-2),
      ('0' + minutes).slice(-2),
      ('0' + seconds).slice(-2),
    ].join(':');
  });
</script>

<template>
  <div class="timer-display">
    {{ formattedTimer }}
  </div>
</template>

<style scoped>
/* cqmin: the smaller value of cqi (1% on container width) and cqb (1% on container height) */
.timer-display {
  font-family: 'Dai Banna SIL';
  font-size: clamp(2rem, 28cqmin, 28rem);
  /* offset-x | offset-y | blur-radius | color */
  text-shadow: 0.5rem 0.3rem 0.7rem #333;
}
</style>