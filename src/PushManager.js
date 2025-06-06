"use client";
import { useEffect, useState } from 'react';

export default function PushManager() {
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
        }
    }, []);

    const subscribe = async () => {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return alert("Permission denied.");

        const reg = await navigator.serviceWorker.register('/sw.js');

        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
            ),
        });

        await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(sub),
            headers: { 'Content-Type': 'application/json' },
        });

        alert('Subscribed!');
    };

    return isSupported ? (
        <button onClick={subscribe}>Subscribe to Notifications</button>
    ) : (
        <p>Push not supported</p>
    );
}

// Helper function
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
