<script setup lang="ts">
  const { DURATION_SOUND } = useAppConfig();

  // === Composables ===
  const timer = useTimer();
  const userSelection = useUserSelection();
  const utility = useUtility(import.meta);


  // === Data ===
  const state = reactive({
    isAdLoaded: false,
  });


  // === Watchers ===
  watchEffect(() => {
    // console.log(`[${utility.currentFileName}::watchEffect()] timer.state.currentTimer: `, timer.state.currentTimer);

    if (timer.state.currentTimer) {
      // Timer is higher than 0, count down continues
      return;
    }

    if (!timer.state.isTimerOn) {
      // Count down is OFF, no action needed
      return;
    }

    // Timer is 0, and count down is still ON, proceed to switch off timer
    timer.stopTimer();

    // Blink the timer when timer reaches 0, providing it is on a count down and not user input
    timer.startTimerBlink();

    // Play sound
    timer.startSound();

    // Initialize next interval settings after a short timeout
    setTimeout(() => {
      // Stop timer from blinking
      timer.stopTimerBlink();

      // Stop sound
      timer.stopSound();
    }, DURATION_SOUND)
  });


  // === Lifecycle Hooks ===
  /**
   * Clear interval process
   */
  onBeforeUnmount(() => {
    if (timer.state.intervalIdTimer) {
      clearInterval(timer.state.intervalIdTimer);
    }

    timer.state.intervalIdTimer = 0;
  });

  /**
   * Start interval to count down timer if it is switched on
   */
  onMounted(() => {
    // console.log(`[${utility.currentFileName}::onMounted] userSelection.initialTimer.value: `, userSelection.initialTimer.value);
    timer.state.currentTimer = userSelection.initialTimer.value;

    timer.state.intervalIdTimer = setInterval(() => {
      if (!timer.state.isTimerOn || timer.state.isInEditMode) {
        // Skip countdown if timer is off or user is editing the timer
        return;
      }

      if ((timer.state.currentTimer ?? 0) > 0) {
        // console.log(`[${utility.currentFileName}::onMounted] Date().getTime():`, new Date().getTime());
        // console.log(`[${utility.currentFileName}::onMounted] timer.state.currentTimer:`, timer.state.currentTimer);
        timer.calculateCurrentTimeForDisplay();
      }
    }, 1000);

    // Resize ad iframe
    useHead({
      script: [
        // Supports iframe resizing
        {
          async: true,
          crossorigin: 'anonymous',
          integrity: 'sha512-f0wd6UIvZbsjPNebGx+uMzHmg6KXr1jWvumJDYSEDmwYJYOptZ0dTka/wBJu7Tj80tnCYMKoKicqvZiIc9GJgw==',
          referrerpolicy: 'no-referrer',
          src: 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.min.js',
          type: 'text/javascript',
        },
      ],
    });

    setTimeout(() => {
      // Resize iframe that displays ad from https://ads.ivan-lim.com
      // @ts-ignore, iFrameResize is made available by iframeResizer.min.js
      iFrameResize({ log: false }, 'iframe.ads');

      // Display ad element
      state.isAdLoaded = true;
    }, 2000);
  });
</script>

<template>
  <!-- align-center: vertically middle -->
  <!-- justify-center: horizontally center -->
  <VRow class="align-center">
    <VCol
      class="text-center mt-5 py-0"
      cols="12"
      v-if="!timer.state.isInEditMode"
    >
      <!-- === Timer Counter Display === -->
      <TimerDisplay
        :style="{ opacity: timer.state.isTimerVisible ? 1 : 0 }"
        :timer="timer.state.currentTimer"
        @click="() => {
          if (timer.state.currentTimer > 0) {
            // If there is time remaining, toggle count down
            timer.toggleTimer();
            return;
          }

          // Reset Timer
          timer.resetTimer();
        }"
      />

      <!-- === Timer Sound Dropdown === -->
      <TimerSound />

      <!-- === Background Image Dropdown === -->
      <BackgroundChooser />
    </VCol>

    <!-- === Set Timer Editor === -->
    <VCol
      class="text-center mt-auto py-0"
      v-else
    >
      <TimerEditor />
    </VCol>

    <!-- === Buttons: Set Timer, Start, Reset... === -->
    <VCol
      class="text-center mb-auto pa-0"
      cols="12"
    >
      <ActionButtons />
    </VCol>

    <!-- === Ads: Google AdSense, Amazon === -->
    <!-- Available through extends '../nuxt-ads' -->
    <VCol
      class="mt-10 text-center"
      cols="12"
      v-show="state.isAdLoaded"
    >
      <iframe class="ads" src="https://ads.ivan-lim.com" frameborder="0"></iframe>
    </VCol>
  </VRow>
</template>

<style scoped>
.timer-display {
  cursor: pointer;
}

iframe.ads {
  background-color: transparent;
  /* Without resetting color-scheme the iframe will have white background if global color-scheme is 'dark' */
  color-scheme: normal;
  height: 0px;
  min-width: 100%;
}
</style>