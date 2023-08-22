<script setup lang="ts">
  const router = useRouter();
  const userSelection = useUserSelection();
</script>

<template>
  <RouterLink to="/">
    <img src="~/assets/img/logo.webp" class="logo mt-1 mr-2"/>
  </RouterLink>
  <h1 @click="router.push({ path: '/' })">{{ userSelection.appTitle.value }}</h1>
</template>

<style scoped>
  .logo {
    --dynamic-dimension: clamp(1.5rem, 3.1cqi, 2.5rem);
    height: var(--dynamic-dimension);
    width: var(--dynamic-dimension);
  }

  h1 {
    --dynamic-dimension: clamp(1.5rem, 3.3cqi, 2.5rem);
    cursor: pointer;
    /* Dynamically adjust font based on screen width */
    font-size: var(--dynamic-dimension);
  }
</style>
