<script setup lang="ts">
  const { SECONDS_IN_A_MINUTE, SECONDS_IN_AN_HOUR } = useAppConfig();


  // === Composables ===
  const userSelection = useUserSelection();


  // === Computed Fields ===
  const hours = computed({
    get() {
      return Math.floor(userSelection.initialTimer.value / SECONDS_IN_AN_HOUR);
    },
    set(value) {
      userSelection.initialTimer.value = value * SECONDS_IN_AN_HOUR + minutes.value * SECONDS_IN_A_MINUTE + seconds.value;
    },
  });

  const minutes = computed({
    get() {
      return Math.floor((userSelection.initialTimer.value - (hours.value * SECONDS_IN_AN_HOUR)) / SECONDS_IN_A_MINUTE);
    },
    set(value) {
      userSelection.initialTimer.value = hours.value * SECONDS_IN_AN_HOUR + value * SECONDS_IN_A_MINUTE + seconds.value;
    },
  });

  const seconds = computed({
    get() {
      return userSelection.initialTimer.value - (hours.value * SECONDS_IN_AN_HOUR) - (minutes.value * SECONDS_IN_A_MINUTE);
    },
    set(value) {
      userSelection.initialTimer.value = hours.value * SECONDS_IN_AN_HOUR + minutes.value * SECONDS_IN_A_MINUTE + value;
    },
  });
</script>

<template>
  <TimerDisplay
    :timer="userSelection.initialTimer.value"
  />

  <!-- Note: Using table to give label column the same width -->
  <table class="table-sliders w-100">
    <tbody>
      <!-- === Slider: Hours === -->
      <tr>
        <td>H</td>
        <td>
          <TimerEditorSlider
            color="orange"
            v-model="hours"
            :max="24"
            :thumb-label="hours > 0 ? 'always' : ''"
            @decrement="hours > 0 ? hours -= 1 : false"
            @increment="hours < 24 ? hours += 1 : false"
          />
        </td>
      </tr>

      <!-- === Slider: Minutes === -->
      <tr>
        <td>M</td>
        <td>
          <TimerEditorSlider
            color="amber"
            v-model="minutes"
            :max="59"
            :thumb-label="minutes > 0 ? 'always' : ''"
            @decrement="minutes > 0 ? minutes -= 1 : false"
            @increment="minutes < 59 ? minutes += 1 : false"
          />
        </td>
      </tr>

      <!-- === Slider: Seconds === -->
      <tr>
        <td>S</td>
        <td>
          <TimerEditorSlider
            color="yellow"
            v-model="seconds"
            :max="59"
            :thumb-label="seconds > 0 ? 'always' : ''"
            @decrement="seconds > 0 ? seconds -= 1 : false"
            @increment="seconds < 59 ? seconds += 1 : false"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table-sliders > tr > td:first-child {
  padding-right: 5px;
  padding-top: 5px;
  text-align: center;
  vertical-align: top;
  width: 20px;
}
</style>
