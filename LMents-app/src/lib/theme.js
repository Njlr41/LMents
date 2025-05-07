import { writable } from 'svelte/store';
import { Preferences } from '@capacitor/preferences';

export const theme_color = writable('#F2B344');
export const theme_color_name = writable('Yellow');

if (typeof window !== 'undefined'){
    (async () => {
        let color = await Preferences.get({ key: 'theme_color' })
        if (color){
            theme_color.set(color.value);
        } 
        theme_color.subscribe((color) => {
            Preferences.set({ key: 'theme_color', value: color });
        });
        
        let color_name = await Preferences.get({ key: 'theme_color_name' })
        if (color_name){
            theme_color_name.set(color_name.value);
        } 
        theme_color_name.subscribe((color_name) => {
            Preferences.set({ key: 'theme_color_name', value: color_name });
        });
    })
}

