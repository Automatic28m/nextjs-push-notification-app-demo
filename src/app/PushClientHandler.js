"use client";
import { useEffect } from 'react';

export default function PushClientHandler() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const audio = new Audio('/notify.mp3');

        navigator.serviceWorker?.addEventListener('message', (event) => {
            if (event.data?.type === 'PLAY_SOUND') {
                audio.play().catch((err) =>
                    console.warn("Unable to play sound:", err)
                );
            }
        });
    }, []);

    return null;
}
