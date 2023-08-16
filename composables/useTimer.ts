// === Composables ===
const userSelection = useUserSelection();
const utility = useUtility(import.meta);


// === Data ===
interface StateObject {
  currentTimer: number,
  intervalIdTimer: any;
  intervalIdTimerBlink: any;
  isInEditMode: boolean;
  isReset: boolean;
  isSoundOn: boolean;
  isTimerOn: boolean;
  isTimerVisible: boolean;
}

const state: StateObject = reactive({
  currentTimer: userSelection.initialTimer.value,
  intervalIdTimer: 0,
  intervalIdTimerBlink: 0,
  isInEditMode: false,
  // Whether the Reset function is called (usually by user click)
  isReset: false,
  isSoundOn: false,
  isTimerOn: false,
  isTimerVisible: true,
});


// === Watchers ===
watch(userSelection.initialTimer, (value) => {
  // console.log(`[${utility.currentFileName}::watch::userSelection.initialTimer] value: `, value);

  if (value) {
    // Change current timer to initial timer if it has been changed, only if initial timer > 0
    state.currentTimer = value;
  }
});


export default () => {
  // === Methods ===
  /**
   * Set timer to initial value, clear countdown task
   */
  const resetTimer = () => {
    state.isReset = true;
    state.isSoundOn = false;
    state.isTimerOn = false;

    stopTimerBlink();

    state.currentTimer = userSelection.initialTimer.value;
  };

  const startSound = () => {
    state.isSoundOn = true;
  }

  const startTimer = () => {
    state.isTimerOn = true;
  }

  /**
   * Start to blink timer
   */
  const startTimerBlink = () => {
    stopTimerBlink();

    state.intervalIdTimerBlink = setInterval(() => {
      state.isTimerVisible = !state.isTimerVisible;
    }, useAppConfig().TIMER_BLINK_INTERVAL);
  };

  const stopSound = () => {
    state.isSoundOn = false;
  }

  const stopTimer = () => {
    state.isTimerOn = false;
  }

  /**
   * Stop timer from blinking
   */
  const stopTimerBlink = () => {
    if (state.intervalIdTimerBlink) {
      clearInterval(state.intervalIdTimerBlink);
    }

    state.isTimerVisible = true;
  };

  const toggleTimer = () => {
    state.isTimerOn = !state.isTimerOn;
  }


  return {
    resetTimer,
    startSound,
    startTimer,
    startTimerBlink,
    stopSound,
    stopTimer,
    stopTimerBlink,
    state,
    toggleTimer,
  }
};
