import webpush from 'web-push';

export async function POST(request) {
    try {
        const subscription = await request.json();

        const vapidKeys = {
            publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            privateKey: process.env.VAPID_PRIVATE_KEY,
        };

        webpush.setVapidDetails(
            process.env.VAPID_EMAIL,
            vapidKeys.publicKey,
            vapidKeys.privateKey
        );

        // Send a test notification immediately (optional)
        await webpush.sendNotification(subscription, JSON.stringify({
            title: 'Hello!',
            body: 'Thanks for subscribing to notifications!',
        }));

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error('Error in subscribe API:', err);
        return new Response(JSON.stringify({ error: 'Subscription failed' }), {
            status: 500,
        });
    }
}
