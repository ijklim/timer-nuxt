// === Composables ===
const utility = useUtility(import.meta);


// === Background Image Choices ===
const optionNoBackgroundSelected = '(No Background Image)';
// Note: All background image files must be located in folder `@/assets/images`, must have extension `.webp`
const BACKGROUND_IMAGE_FILES = [
  optionNoBackgroundSelected,
  '2-puppies',
  '3d-render',
  'beach-vacation',
  'bird',
  'boats-blue-lake',
  'boats-docked',
  'candles',
  'cartoon-dragon',
  'dinosaur-trex',
  'dog',
  'landscape-1',
  'landscape-2',
  'lanterns',
  'unicorn-fluffy-toys',
  'unicorn-pegasus-fantasy-art',
];


// === Data ===
interface StateObject {
  appTitle: string | null;
  backgroundImageFileSelected: string | null;
  initialTimer: number | null;
  isDarkThemeSelected: boolean | null;
  isInitialTimerUpdatable: boolean;
}
const state: StateObject = reactive({
  appTitle: null,
  backgroundImageFileSelected: null,
  // Time period for the full countdown, also the reset time (in seconds)
  initialTimer: null,
  isDarkThemeSelected: null,
  isInitialTimerUpdatable: true,
});


// === Computed Fields ===
/**
 * App Title is the text that shows up beside the logo in the top left corner
 */
const appTitle = computed({
  get() {
    return state.appTitle ?? useAppConfig().appName;
  },
  set(value: string) {
    if (value) {
      state.appTitle = value;
      return;
    }

    if (!state.appTitle) {
      // Current App Title is blank and no value is assigned, set to default app name
      state.appTitle = useAppConfig().appName;
    }
  },
});

/**
 * Background color of input field (e.g. VSelect) is dependent on theme selected
 */
const backgroundColorInputField = computed(() => {
  return isDarkThemeSelected.value ? 'amber-darken-4' : 'amber-lighten-4';
});

/**
 * The background image file that the user has selected
 */
const cacheKeyBackgroundImageFileSelected: string = `${utility.cacheKeyPrefix}__backgroundImageFileSelected`;
const backgroundImageFileSelected = computed({
  get() {
    if (state.backgroundImageFileSelected) {
      return state.backgroundImageFileSelected;
    }

    // Note: Do not consider cached value here, to avoid SSR hydration warning
    const defaultValue = optionNoBackgroundSelected;
    return defaultValue;
  },
  set(value: string) {
    // console.log(`[${utility.currentFileName}::computed::backgroundImageFileSelected::set] value`, value);
    state.backgroundImageFileSelected = value || optionNoBackgroundSelected;
    // Cache setting
    cache.store(cacheKeyBackgroundImageFileSelected, value);
  },
});

/**
 * The generated url of the background image selected by the user
 *
 * Note: All image files should have extension `.webp`
 */
const backgroundImageFileSelectedUrl = computed(() => {
  if (backgroundImageFileSelected.value === optionNoBackgroundSelected) {
    return getImageUrl('blank', 'png');
  }

  const fileName = `${backgroundImageFileSelected.value}`;
  const result = getImageUrl(fileName);

  return result;
});

/**
 * The timer set by the user, default if user hasn't selected one yet
 */
const cacheKeyInitialTimer = `${utility.cacheKeyPrefix}__initialTimer`;
const initialTimer = computed({
  get() {
    if (state.initialTimer) {
      return state.initialTimer
    }

    // Default timer is 5 x 60 seconds (i.e. 5 mins)
    const defaultTimer = 5 * 60;
    return defaultTimer;
  },
  set(value: number) {
    setInitialTimer(value);
    // Cache setting
    cache.store(cacheKeyInitialTimer, state.initialTimer);
  },
});

const cacheKeyIsDarkThemeSelected = `${utility.cacheKeyPrefix}__isDarkThemeSelected`;
const isDarkThemeSelected = computed({
  get() {
    if (state.isDarkThemeSelected !== null) {
      return state.isDarkThemeSelected;
    }

    const defaultValue = true;
    return defaultValue;
  },
  set(value: boolean) {
    state.isDarkThemeSelected = value;
    // Cache setting
    cache.store(cacheKeyIsDarkThemeSelected, value);
  },
});


// === Methods ===
/**
 * Return the URL path of an image file
 *
 * Note: Image file is expected to be located in folder `assets/img`
 *
 * @param {string} fileName
 * @param {string} extension
 *
 * @returns {string}
 */
const getImageUrl = (fileName: string, extension: string = 'webp'): string => {
  // Note: Cannot use all variables in url path below, Vite would not know to copy the asset files
  return `/img/background/${fileName}.${extension}`;
};

/**
 * Set state variable initialTimer with the option to lock down the timer
 *
 * @param {int} value
 */
const setInitialTimer = (valueTimer: number | null, isInitialTimerUpdatable = true) => {
  state.initialTimer = valueTimer;

  state.isInitialTimerUpdatable = isInitialTimerUpdatable;
};

/**
 * Setting description meta tag in document <head>
 *
 * @param {string} metaDescription
 */
const setPageMetaDescription = (metaDescription: string) => {
  // Note: useHead() does not seem to work, and <Head> forces slow page refresh
  useSeoMeta({
    description: () => metaDescription,
  });
};

/**
 * Set the document title, affects browser tab text
 *
 * @param {string} title
 */
const setPageTitle = (title: string) => {
  useSeoMeta({
    title: () => title,
  });
};


export default () => {
  return {
    appTitle,
    BACKGROUND_IMAGE_FILES,
    backgroundColorInputField,
    backgroundImageFileSelected,
    backgroundImageFileSelectedUrl,
    cacheKeyBackgroundImageFileSelected,
    cacheKeyInitialTimer,
    cacheKeyIsDarkThemeSelected,
    getImageUrl,
    initialTimer,
    isDarkThemeSelected,
    optionNoBackgroundSelected,
    setInitialTimer,
    setPageMetaDescription,
    setPageTitle,
    state,
  }
};
