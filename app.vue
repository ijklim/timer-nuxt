<script setup lang="ts">
  import { NavigationHookAfter } from 'vue-router';
  const { appName, SECONDS_IN_A_MINUTE, SECONDS_IN_AN_HOUR, SUPPORTED_URL_SEGMENTS } = useAppConfig();


  // === Composables ===
  const route = useRoute();
  const router = useRouter();
  const timer = useTimer();
  const userSelection = useUserSelection();
  const utility = useUtility(import.meta);


  // === Data ===
  const state = reactive({
    shouldShowBackgroundImage: true,
  });


  // === Computed Fields ===
  const urlBackgroundImage =  computed(() => {
    // console.log(`[${utility.currentFileName}::computed::urlBackgroundImage()] state.shouldShowBackgroundImage:`, state.shouldShowBackgroundImage);
    // console.log(`[${utility.currentFileName}::computed::urlBackgroundImage()] userSelection.backgroundImageFileSelectedUrl.value:`, userSelection.backgroundImageFileSelectedUrl.value);
    return `url(${state.shouldShowBackgroundImage ? userSelection.backgroundImageFileSelectedUrl.value : userSelection.getImageUrl('blank', 'png')})`;
  });


  // === Methods ===
  /**
   * Update app title, meta description, initial timer based on route (e.g. {host}/10-minute-timer)
   *
   * @param toRoute
   */
  const handleRouteChange: NavigationHookAfter = (toRoute) => {
    // console.log(`[${utility.currentFileName}::handleRouteChange()] toRoute.[path, params]:`, toRoute.path, toRoute.params);

    // Whenever route changes, scroll to the top, add timer as some pages takes a little time
    if (process.client) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 200);
    }

    const supportedUrlSegmentKeys = Object.keys(SUPPORTED_URL_SEGMENTS);
    // toRoute.path examples: 1, /2-minute-timer/, /10-minute-timer/
    // Note: Must remove trailing / if it exists and it is not root (/)
    const searchKey = toRoute.path?.length > 1 && toRoute.path?.endsWith('/') ? toRoute.path.slice(0, -1) : toRoute.path;
    // console.log(`[${utility.currentFileName}::handleRouteChange()] searchKey:`, searchKey);
    if (supportedUrlSegmentKeys.includes(searchKey)) {
      // Route path (e.g. /10-minute-timer) matches a key in SUPPORTED_URL_SEGMENTS
      const isInitialTimerUpdatable = !SUPPORTED_URL_SEGMENTS[searchKey]?.timer;
      // Timer is preset if the `timer` attribute exists
      const timer = SUPPORTED_URL_SEGMENTS[searchKey]?.timer ?? null;

      userSelection.setInitialTimer(timer, isInitialTimerUpdatable);
      userSelection.appTitle.value = SUPPORTED_URL_SEGMENTS[searchKey]?.appTitle;
      userSelection.setPageMetaDescription(SUPPORTED_URL_SEGMENTS[searchKey]?.pageMetaDescription);

      state.shouldShowBackgroundImage = true;
      return;
    }

    // No background image for pages such as `/benefits` and `/privacy`
    state.shouldShowBackgroundImage = false;
  };


  // === Life Cycle Hooks ===
  // Note: `router.afterEach` will only trigger after route change, not initial load
  const removeEventRouterAfterEach = router.afterEach(handleRouteChange);

  // Clean up
  onBeforeUnmount(removeEventRouterAfterEach);


  // === Watchers ===
  /**
   * During count down change text in browser tab
   */
  watch(() => timer.state.currentTimer, (currentTimer) => {
    // console.log(`[${utility.currentFileName}::watch::timer.state.currentTimer] currentTimer:`, currentTimer);

    if (currentTimer === userSelection.initialTimer.value) {
      // Timer hasn't started, should use default page title
      // Set the text in the browser tab, add App Name if appTitle is different, e.g. 5 Minute Timer by Online Timer
      // Note: Should work for non timer page (e.g. privacy) as currentTimer should never change
      userSelection.setPageTitle(`${userSelection.appTitle.value} ${userSelection.appTitle.value !== appName ? ` by ${appName}` : ''}`);
      return;
    }

    const timerToDisplay = Math.round(currentTimer);
    let hours = Math.floor(timerToDisplay / SECONDS_IN_AN_HOUR);
    let minutes = Math.floor((timerToDisplay - (hours * SECONDS_IN_AN_HOUR)) / SECONDS_IN_A_MINUTE);
    let seconds = timerToDisplay - (hours * SECONDS_IN_AN_HOUR) - (minutes * SECONDS_IN_A_MINUTE);

    const arrayPageTitle = [];
    if (hours) {
      // Skip hours to save space if hours is 0, not 0 padded
      arrayPageTitle.push(hours);
    }
    arrayPageTitle.push(('0' + minutes).slice(-2));
    arrayPageTitle.push(('0' + seconds).slice(-2));

    // console.log(`[${utility.currentFileName}::watch::timer.state.currentTimer] arrayPageTitle:`, arrayPageTitle);

    // Change text in browser tab
    userSelection.setPageTitle(`${arrayPageTitle.join(':')} | ${userSelection.appTitle.value}`);
  }, { immediate: true });


  // === Server Side code for prerendering ===
  await router.isReady();
  handleRouteChange(route, route);
</script>

<template>
  <VLayout>
    <!-- === Header === -->
    <!-- Note: Add opacity to support see through background -->
    <AppHeader style="opacity:0.85;" />

    <VMain>
      <!-- Note: Removing padding from container prevents time display from being cut off on the right, and footer with gap -->
      <VContainer fluid class="pa-0">
        <section class="main-content-with-background">
          <!-- Note: More top spacing needed to support removing --v-layout-top space -->
          <RouterView class="pt-10" />
        </section>

        <!-- === Footer === -->
        <AppFooter />
      </VContainer>
    </VMain>
  </VLayout>
</template>

<style scoped>
/* Reserve space to prevent footer from appearing in the content area */
.main-content-with-background {
  background-image: v-bind(urlBackgroundImage);
  background-position: center;
  background-size: cover;
  min-height: calc(100vh - 105px);
}

/* Allows background of VMain to appear behind AppHeader */
main {
  --v-layout-top: 0px!important;
}
</style>
