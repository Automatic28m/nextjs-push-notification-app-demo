self.addEventListener('push', function (event) {
    const data = event.data?.json() || {};
    const title = data.title || "New Notification";
    const options = {
        body: data.body || "This is a web push notification",
        icon: '/icon.png',
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
