import { Body, Controller, Post } from '@nestjs/common';
const webpush = require('web-push');

const vapidKeys = {
    publicKey: "BHnrukMOoUpozT0O0LK9g_snE-nSCM_XeoEfbsy3FJO5vJQIAk5TeSYqol0HlvMUU-3poVLx1xNl8nAv14JVoL4",
    privateKey: "EowHD96TortofOIEv_Idh2vidxh52GNSpnE-PYipqD0"
}

const options = {
    vapidDetails: {
        subject: 'exemple_email@eventdrc.tech',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey
    },
    TTL: 60,
}

@Controller('notifications')
export class NotificationController {
    constructor() {}

    @Post()
    async sendNotification(@Body() payload: any): Promise<void> {
        const subscription = payload;

        return this.sendPushNotification(subscription);
    }

    private sendPushNotification(subscription) {
        webpush.sendNotification(
            subscription,
            JSON.stringify({
                notification: {
                    title: 'OUr first push notification',
                    body: 'Here you can add somme text',
                    vibrate: [100, 50, 100],
                    icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
                    actions: [
                        { action: 'bar', title: 'Focus last'},
                        { action: 'baz', title: 'navigate last'}
                    ],
                    data: {
                       onActionClick: {
                            default: { operation: 'openWindow' },
                            bar: {
                                operation: 'focusLastFocusOrOpen',
                                url: '/layouts/salaires/disponible/:id/bulletin-paie',
                            },
                            baz: {
                                operation: 'navigateLastFocusedOrOpen',
                                url: '/sign'
                            }
                       }
                    }
                }
            }),
            options,
        )
        .then((log) => {
            console.log('Push notification sent.');
            console.log(log);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
