<script setup lang="ts">
  // HTML Audio/Video DOM Reference: https://www.w3schools.com/tags/ref_av_dom.asp

  import { useDisplay } from 'vuetify';


  // === Composables ===
  const display = useDisplay();
  const timer = useTimer();
  const userSelection = useUserSelection();
  const utility = useUtility(import.meta);


  // === Sound Choices ===
  // Note: All sound files must be located in folder `@/assets/audios` with extension '.wav'
  const SOUND_FILES = [
    '3-beeps',
    'cartoon-toy-whistle',
    'cow',
    'cricket',
    'dolphin',
    'elephant',
    'fairy-message',
    'forest-bird',
    'goat',
    'group-cheer-and-applause',
    'horse',
    'marimba',
    'morning-clock-alarm',
    'puppy',
    'rooster',
    'spaceship-alarm',
    'telephone',
    'video-game-bonus',
    'waiting',
    'wild-geese',
    'wind-chime',
  ];


  // === Data ===
  // Sound html element
  const soundPlayer = ref<HTMLAudioElement>();

  interface StateObject {
    isTestSoundOn: boolean;
    soundFileSelected: string | null;
  }
  const state: StateObject = reactive({
    isTestSoundOn: false,
    soundFileSelected: null,
  });


  // === Watchers ===
  watch(() => timer.state.isSoundOn, (newValue, oldValue) => {
    // console.log(`[${utility.currentFileName}::watch::timer.state] newValue, oldValue: `, newValue, oldValue);

    if (newValue && !oldValue) {
      // Play sound if isSoundOn changes from false to true
      playSound();
      return;
    }

    if (newValue) {
      // Sound is on and hasn't changed state (probably should not happen), no other action necessary
      return;
    }

    // === Sound is OFF ===
    if (timer.state.isReset) {
      // Note: Only pause (cut off) sound if the [Reset] button is clicked
      if (soundPlayer.value) {
        soundPlayer.value.pause();
      }
      return;
    }

    // Normally can let the sound file plays to the end, gradually lower the volume in case the sound file is long
    const duration = 1000;
    const noOfSteps = 10;
    for (let i = 0; i < noOfSteps; i++) {
      setTimeout(() => {
        if (!timer.state.isSoundOn) {
          // Only lower the volume if isSoundOn flag is still OFF
          if (soundPlayer.value) {
            soundPlayer.value.volume *= 0.75;
          }
        }
      }, duration / noOfSteps * i);
    }
  });


  // === Computed Fields ===
  /**
   * Size button according to breakpoint
   */
  const buttonSize = computed(() => {
    if (display.smAndUp.value) {
      return 'small';
    }

    return 'x-small';
  });

  const soundFileSelectedUrl = computed(() => {
    // console.log(`[${utility.currentFileName}::computed::soundFileSelectedUrl()] soundFileSelected.value`, soundFileSelected.value);
    // Only wav file is expected
    const fileName = `${soundFileSelected.value}.wav`;
    // Note: Path must start with a static folder (e.g. @/assets/audios/) for Vite to process the asset file in Production build
    // https://vitejs.dev/guide/assets.html
    // Note: Must use `/src` instead of `@` in URL()
    const result = new URL(`../assets/audio/${fileName}`, import.meta.url).href;
    // const result = `~/assets/audio/${fileName}`;
    // For Debug Only
    // console.log(`[${utility.currentFileName}::computed::soundFileSelectedUrl()] fileName, result`, fileName, result);

    return result;
  });

  const cacheKeySoundFileSelected = `${utility.cacheKeyPrefix}__soundFileSelected`;
  const soundFileSelected = computed({
    get() {
      if (state.soundFileSelected) {
        return state.soundFileSelected;
      }

      // Get active index from cache
      const defaultValue = SOUND_FILES[Math.floor(Math.random() * SOUND_FILES.length)];
      const cachedSoundFileSelected = cache.get(cacheKeySoundFileSelected, defaultValue);
      // console.log(`[${utility.currentFileName}::computed::soundFileSelected] cachedSoundFileSelected`, cachedSoundFileSelected);

      // Note: Check to ensure the cached key is still valid
      return SOUND_FILES.includes(cachedSoundFileSelected ?? '') ? cachedSoundFileSelected : defaultValue;
    },
    set(value) {
      state.soundFileSelected = value;
      // Cache setting
      cache.store(cacheKeySoundFileSelected, value);
    },
  });


  // === Methods ===
  /**
   * Play sound again after a short delay if isSoundOn is still true
   *
   * Note: This method is slightly more pleasant than looping for sounds without pause
   */
  const handleAudioEnded = ($event: Event) => {
    // console.log(`[${utility.currentFileName}::handleAudioEnded()] $event.target: `, $event.target);

    // === Turn off sound testing as it should only run once
    state.isTestSoundOn = false;

    // === Repeat sound again is alarm is on
    if (timer.state.isSoundOn) {
      const delay = 300;
      setTimeout(() => {
        if (!timer.state.isSoundOn) {
          return;
        }

        if ($event?.target) {
          ($event.target as HTMLAudioElement).play();
        }
      }, delay);
    }
  }

  /**
   * Start playing alarm sound file
   */
  const playSound = () => {
    // Clear the isReset flag
    timer.state.isReset = false;
    if (soundPlayer.value) {
      // Must set audio track back to the beginning in case it was paused earlier
      soundPlayer.value.currentTime = 0;
      // Return to full volume
      soundPlayer.value.volume = 1;
      soundPlayer.value.play();
    }
  }

  /**
   * Turn sound ON or OFF for testing
   */
  const toggleSound = () => {
    state.isTestSoundOn = !state.isTestSoundOn;

    if (state.isTestSoundOn) {
      // Start sound testing
      playSound();
      return;
    }

    // Stop sound testing (if it hasn't stop yet)
    if (soundPlayer.value) {
      soundPlayer.value.pause();
    }
  }

  /**
   * Update src of the audio element to the selected sound file
   *
   * Note: Setting sound file early (before play) will preload audio file and reduce delay
   * Note: Must set src of audio element as `:src` does not reflect change
   */
   const updateSoundFile = () => {
    // console.log(`[${utility.currentFileName}::updateSoundFile()] Updating audio src: `, soundFileSelectedUrl.value);
    if (soundPlayer.value) {
      soundPlayer.value.src = soundFileSelectedUrl.value;
    }
  }


  // === Lifecycle Hooks ===
  onMounted(() => {
    updateSoundFile();
  });
</script>

<template>
  <!-- === Dropdown: Sound Selection === -->
  <VRow>
    <VCol
      class="text-center mb-auto mx-auto"
      md="6"
      sm="8"
    >
      <!-- Note: VRow here arranges Select and Button on the same line -->
      <VRow class="px-5 px-sm-0">
        <VSelect
          label="Alarm Sound"
          variant="outlined"
          v-model="soundFileSelected"
          :bg-color="userSelection.backgroundColorInputField.value"
          :density="display.mdAndUp.value ? 'comfortable' : 'compact'"
          :disabled="timer.state.isSoundOn"
          :items="SOUND_FILES"
          @update:model-value="updateSoundFile"
        >
        </VSelect>

        <!-- === Button: Test Sound === -->
        <VBtn
          color="info"
          class="ml-5 mt-1"
          icon
          :disabled="timer.state.isSoundOn"
          :size="buttonSize"
          @click="toggleSound"
        >
          <VIcon>{{ state.isTestSoundOn ? 'mdi-stop' : 'mdi-play' }}</VIcon>
          <VTooltip activator="parent" theme="light" location="top center">
            Test Alarm Sound
          </VTooltip>
        </VBtn>
      </VRow>
    </VCol>
  </VRow>

  <audio ref="soundPlayer" @ended="handleAudioEnded">
    Your browser does not support the audio element.
  </audio>
</template>
