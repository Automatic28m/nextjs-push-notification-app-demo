const subscribe = async () => {
    try {
        const reg = await navigator.serviceWorker.register('/sw.js');

        // Wait until the service worker is ready (fully activated)
        const readyReg = await navigator.serviceWorker.ready;

        const sub = await readyReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY),
        });

        await fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(sub),
            headers: { 'Content-Type': 'application/json' },
        });

        alert('Subscribed!');
    } catch (error) {
        console.error('Subscription failed:', error);
        alert('Push subscription failed. Check the console.');
    }
};
