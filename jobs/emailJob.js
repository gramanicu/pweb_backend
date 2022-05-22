import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { channel, events, queueName } from '../awqpClient.js';

dotenv.config();

const transport = nodemailer.createTransport(
    {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        disableFileAccess: true,
        disableUrlAccess: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    },
    { from: 'notifications@charity.ro' }
);

events.on('channelCreated', () => {
    if (channel) {
        console.log('Started email service and connected to queue');
        channel.prefetch(1);

        channel.consume(queueName, data => {
            if (data === null) {
                return;
            }

            let message = JSON.parse(data.content.toString());

            transport.sendMail(message, (err, info) => {
                if (err) {
                    console.error(err.stack);
                    return channel.nack(data);
                }

                console.log('Delivered message %s', info.messageId);
                channel.ack(data);
            });
        });
    }
});
