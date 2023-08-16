import useUtility from '@/composables/useUtility.js';


// === Composables ===
const utility = useUtility(import.meta);


export const cache = {
  get: (key: string, defaultValue: string | null = null) => {
    // console.log(`[${utility.currentFileName}::cache::get] key, localStorage.getItem(key): `, key, localStorage.getItem(key));

    return process.client ? (localStorage.getItem(key) ?? defaultValue) : defaultValue;
  },
  store: (key: string, value: any) => {
    if (process.client) {
      localStorage.setItem(key, value);
    }
  },
};
