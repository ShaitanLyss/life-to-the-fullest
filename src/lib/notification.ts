import { sendNotification, type Options } from "@tauri-apps/plugin-notification";

interface NotifOptions extends Options {
    /** The sound url or boolean. */
    sound?: string | boolean;
}

export function notify({sound, ...options}: NotifOptions) {
    if (sound) {
        new Audio(typeof sound === 'string' ? sound : 'cute_notification.mp3').play().catch((e) => {
            console.error("Failed to play sound", e);
        }
    );
    sendNotification(options);
}
    
}