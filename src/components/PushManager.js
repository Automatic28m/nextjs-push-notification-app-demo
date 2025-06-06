"use client"
import { useEffect, useState } from 'react';

export default function PushManager() {
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const hasSw = 'serviceWorker' in navigator;
        const hasPm = 'PushManager' in window;

        // For iOS 16.4+, PushManager may still be missing, so allow only SW check
        if (hasSw && (hasPm || isIos)) {
            setIsSupported(true);
        }
    }, []);


    const subscribe = async () => {
        const reg = await navigator.serviceWorker.register('/sw.js');
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
        });

        await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(sub),
            headers: { 'Content-Type': 'application/json' },
        });

        alert('Subscribed!');
    };

    return (
        <>
            {isSupported ? (
                <button className="bg-white w-fit px-3 py-2 text-black hover:bg-black hover:border-white-2 hover:text-white cursor-pointer" onClick={subscribe}>Subscribe to Notifications</button>
            ) : (
                <p>Push not supported</p>
            )}
        </>
    );
}

// Helper
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
