// public/sw.js

self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};
    const title = data.title || 'Notification';
    const options = {
        body: data.body || 'You have a new message!',
        icon: '/icon.png',
        tag: 'simple-push-demo',
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );

    // Broadcast message to client
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'PLAY_SOUND',
                message: 'Play alert sound',
            });
        });
    });
});
