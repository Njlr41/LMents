import { writable } from 'svelte/store';
import { Preferences } from '@capacitor/preferences';

export const theme_color = writable("green");

if (typeof window !== 'undefined') {
    let color = await Preferences.get({ key: 'theme_color' })
    if (color) {
         theme_color.set(color.value);
    }

    theme_color.subscribe(async (color) => {
        Preferences.set({key: "theme_color", value: color})
    })
}
