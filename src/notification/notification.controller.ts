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
    async sendNotification(
        @Body() payload: any
    ): Promise<void> {
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
