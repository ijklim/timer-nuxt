<script setup>
  // import { watch, watchEffect } from 'vue';
  // import { useRoute, useRouter  } from 'vue-router';
  // import useTimer from '@/composables/useTimer.js';
  // import useUserSelection from '@/composables/useUserSelection.js';
  // import useUtility from '@/composables/useUtility.js';
  // import { appName, SECONDS_IN_A_MINUTE, SECONDS_IN_AN_HOUR, SUPPORTED_URL_SEGMENTS } from '@/utilities/constants.js';


  // === Composables ===
  // const route = useRoute();
  // const router = useRouter();
  // const timer = useTimer();
  const userSelection = useUserSelection();
  // const utility = useUtility(import.meta);


  // === Watchers ===
  /**
   * Handle url with preset time, e.g. /10-minute-timer
   */
  // watchEffect(() => {
  //   // console.log(`[${utility.currentFileName}::watch()::route.params?.urlSegment] urlSegmentInRoute: `, urlSegmentInRoute);
  //   // console.log(`[${utility.currentFileName}::watch()::route.params?.urlSegment] (starting) userSelection.appTitle.value: `, userSelection.appTitle.value);

  //   const urlSegmentInRoute = route.params?.urlSegment;

  //   const supportedUrlSegmentKeys = Object.keys(SUPPORTED_URL_SEGMENTS);
  //   // Note: urlSegmentInRoute for path `/privacy` is null, as it does not use the `/:urlSegment` route
  //   const searchKey = urlSegmentInRoute ?? '/';
  //   // console.log(`[${utility.currentFileName}::watch()::route.params?.urlSegment] searchKey: `, searchKey);
  //   if (supportedUrlSegmentKeys.includes(searchKey)) {
  //     // Url segment (e.g. 10-minute-timer) matches a key in SUPPORTED_URL_SEGMENTS
  //     const isInitialTimerUpdatable = !SUPPORTED_URL_SEGMENTS[searchKey]?.timer;
  //     const metaDescription = SUPPORTED_URL_SEGMENTS[searchKey]?.pageMetaDescription;
  //     // Timer is preset if the `timer` attribute exists
  //     const timer = SUPPORTED_URL_SEGMENTS[searchKey]?.timer;

  //     userSelection.setInitialTimer(timer, isInitialTimerUpdatable);
  //     userSelection.appTitle.value = SUPPORTED_URL_SEGMENTS[searchKey]?.appTitle;
  //     userSelection.setPageMetaDescription(metaDescription);

  //     // console.log(`[${utility.currentFileName}::watch()::route.params?.urlSegment] (ending) userSelection.appTitle.value: `, userSelection.appTitle.value);
  //   }
  // });

  /**
   * During count down change text in browser tab
   */
  // watch(() => timer.state.currentTimer, (currentTimer) => {
  //   // console.log(`[${utility.currentFileName}::watch::timer.state.currentTimer] currentTimer:`, currentTimer);

  //   if (currentTimer === userSelection.initialTimer.value) {
  //     // Timer hasn't started, should use default page title
  //     // Set the text in the browser tab, add App Name if appTitle is different, e.g. 5 Minute Timer by Online Timer
  //     // Note: Should work for non timer page (e.g. privacy) as currentTimer should never change
  //     userSelection.setPageTitle(`${userSelection.appTitle.value} ${userSelection.appTitle.value !== appName ? ` by ${appName}` : ''}`);
  //     return;
  //   }

  //   let hours = Math.floor(currentTimer / SECONDS_IN_AN_HOUR);
  //   let minutes = Math.floor((currentTimer - (hours * SECONDS_IN_AN_HOUR)) / SECONDS_IN_A_MINUTE);
  //   let seconds = currentTimer - (hours * SECONDS_IN_AN_HOUR) - (minutes * SECONDS_IN_A_MINUTE);

  //   const arrayPageTitle = [];
  //   if (hours) {
  //     // Skip hours to save space if hours is 0, not 0 padded
  //     arrayPageTitle.push(hours);
  //   }
  //   arrayPageTitle.push(('0' + minutes).slice(-2));
  //   arrayPageTitle.push(('0' + seconds).slice(-2));

  //   // console.log(`[${utility.currentFileName}::watch::timer.state.currentTimer] arrayPageTitle:`, arrayPageTitle);

  //   // Change text in browser tab
  //   userSelection.setPageTitle(`${arrayPageTitle.join(':')} | ${userSelection.appTitle.value}`);
  // });
</script>

<template>
  <RouterLink to="/">
    <img src="~/assets/img/logo.png" class="logo mr-2"/>
  </RouterLink>
  <h1 @click="router.push({ path: '/' })">{{ userSelection.appTitle.value }}</h1>
</template>

<style scoped>
  .logo {
    --dynamic-dimension: clamp(1.5rem, 3.1cqi, 2.5rem);
  }

  h1 {
    --dynamic-dimension: clamp(1.5rem, 3.3cqi, 2.5rem);
  }

  .logo {
    height: var(--dynamic-dimension);
    width: var(--dynamic-dimension);
  }

  h1 {
    cursor: pointer;
    /* Dynamically adjust font based on screen width */
    font-size: var(--dynamic-dimension);
  }

  small {
    /* Font size base on parent's font size */
    font-size: 30%;
    font-style: italic;
  }
</style>
