<script setup lang="ts">
  import { useDisplay } from 'vuetify';


  // === Composables ===
  const display = useDisplay();
  const timer = useTimer();
  const userSelection = useUserSelection();


  // === Computed Fields ===
  const buttonClasses = computed(() => {
    const classes = [
      // Gap between buttons
      'mx-3',
      'mx-sm-8',
      'my-3',
      // Padding
      'py-2',
      'px-8',
      'px-sm-8',
    ];

    return classes;
  });

  /**
   * Size button according to breakpoint
   */
  const buttonSize = computed(() => {
    if (display.mdAndUp.value) {
      return 'x-large';
    }

    if (display.smAndUp.value) {
      return 'large';
    }

    return undefined;
  });

  /**
   * Start Button text
   */
  const buttonStartText = computed(() => {
    if (timer.state.isTimerOn) {
      return 'Pause';
    }

    if (timer.state.currentTimer === userSelection.initialTimer.value) {
      return 'Start';
    }

    return 'Continue';
  });
</script>

<template>
  <!-- === Button: Set Time === -->
  <VBtn
    v-if="userSelection.state.isInitialTimerUpdatable"
    :class="buttonClasses"
    :color="timer.state.isInEditMode ? 'success' : 'info'"
    :size="buttonSize"
    @click="() => {
      timer.state.isInEditMode = !timer.state.isInEditMode;
      timer.stopTimer();
    }"
  >
    {{ timer.state.isInEditMode ? 'Save' : 'Set Timer' }}
  </VBtn>

  <!-- === Button: Start/Pause === -->
  <VBtn
    v-if="!timer.state.isInEditMode && timer.state.currentTimer > 0"
    :class="buttonClasses"
    :color="timer.state.isTimerOn ? 'warning' : 'success'"
    :size="buttonSize"
    @click="timer.toggleTimer()"
  >
    {{ buttonStartText }}
  </VBtn>

  <!-- === Button: Reset === -->
  <VBtn
    color="grey-lighten-3"
    v-if="!timer.state.isInEditMode"
    :class="buttonClasses"
    :size="buttonSize"
    @click="timer.resetTimer"
  >
    Reset
  </VBtn>
</template>