const appName = 'Online Timer';
const appVersion = '2.0.6';
const appMetaDescription = 'Free Online Timer. Customize your alarm sound and background picture. Easily set hour, minute, and second intervals.';

// https://nuxt.com/docs/getting-started/configuration
const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = SECONDS_IN_A_MINUTE * 60;

// === How long the alarm will play for (in ms) ===
const DURATION_SOUND = 3 * 60 * 1000;

// === Time between timer display blink (in ms) ===
const TIMER_BLINK_INTERVAL = 350;

// === SEO popular preset timers ===
const SUFFIX_APP_META_DESCRIPTION = 'FREE and easy to use. Option to choose different alarm sound and background picture.';

// Note: `?` indicates optional
interface UrlSegmentObject {
  appTitle: string;
  pageMetaDescription: string;
  showInFooter?: boolean;
  timer?: number;
}
interface UrlSegmentsObject {
  [key: string]: UrlSegmentObject;
}

// Note: `: UrlSegmentsObject` indicates `SUPPORTED_URL_SEGMENTS` has type `UrlSegmentsObject`
const SUPPORTED_URL_SEGMENTS: UrlSegmentsObject = {
  // Note: Only if timer attribute exists should the initial timer be changed
  '/': {
    appTitle: appName,
    pageMetaDescription: appMetaDescription,
    showInFooter: false,
  },
  '/classroom-timer': {
    appTitle: 'Classroom Timer',
    pageMetaDescription: `Classroom timer online. ${SUFFIX_APP_META_DESCRIPTION}`,
  },
  '/timer-clock': {
    appTitle: 'Timer Clock',
    pageMetaDescription: `Timer clock online. ${SUFFIX_APP_META_DESCRIPTION}`,
  },
};

// Add 1 Minute Timer, 2 Minute Timer...
[1, 2, 5, 10, 15, 20, 25, 30, 45].forEach((noOfMinutes) => {
  SUPPORTED_URL_SEGMENTS[`/${noOfMinutes}-minute-timer` as string] = {
    appTitle: `${noOfMinutes} Minute Timer`,
    pageMetaDescription: `${noOfMinutes} minute timer online. ${SUFFIX_APP_META_DESCRIPTION}`,
    showInFooter: true,
    timer: SECONDS_IN_A_MINUTE * noOfMinutes,
  };
});

// Add 1 Hour Timer
SUPPORTED_URL_SEGMENTS['/1-hour-timer'] = {
  appTitle: '1 Hour Timer',
  pageMetaDescription: `1 hour timer online. ${SUFFIX_APP_META_DESCRIPTION}`,
  timer: SECONDS_IN_A_MINUTE * 60,
  showInFooter: true,
};

export default defineAppConfig({
  // === App Info ===
  appName,
  appVersion,
  appMetaDescription,
  // === Constants ===
  SECONDS_IN_A_MINUTE,
  SECONDS_IN_AN_HOUR,
  // === App Level Settings ===
  DURATION_SOUND,
  TIMER_BLINK_INTERVAL,
  SUPPORTED_URL_SEGMENTS,
});
