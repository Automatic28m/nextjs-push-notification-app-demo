import webpush from 'web-push';

webpush.setVapidDetails(
    process.env.VAPID_EMAIL,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

let subscriptions = []; // for demo only; use DB in real apps

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const subscription = req.body;
        subscriptions.push(subscription);

        // send test notification
        const payload = JSON.stringify({
            title: 'Demo Push',
            body: 'You successfully subscribed!',
        });

        try {
            await webpush.sendNotification(subscription, payload);
            res.status(201).json({ message: 'Notification sent' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Notification failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
