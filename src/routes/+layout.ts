// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
export const prerender = true;
export const ssr = false;

import { isTauri } from "@tauri-apps/api/core";
import { Window } from "@tauri-apps/api/window";

if (typeof window !== "undefined" && isTauri()) {
Window.getAll().then((windows) => {
    for (const window of windows) {
        window.show();
    }
});
}
