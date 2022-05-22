import amqplib from 'amqplib/callback_api.js';
import * as dotenv from 'dotenv';
import EventEmitter from 'events';

dotenv.config();
if (!process.env.AMQP_URL || !process.env.AMQP_MAIL_QUEUE) {
    throw 'Make sure you have AMQP_URL, and AMQP_MAIL_QUEUE in your .env file';
}

const url = process.env.AMQP_URL;
export const queueName = process.env.AMQP_MAIL_QUEUE;

export let channel;
export let events = new EventEmitter();

amqplib.connect(url, (error, connection) => {
    if (error) {
        console.error(error.stack);
        return process.exit(1);
    }

    connection.createChannel((err, ch) => {
        if (err) {
            console.error(err.stack);
            return process.exit(1);
        }

        ch.assertQueue(queueName, { durable: true });
        channel = ch;
        events.emit('channelCreated');
    });
});

export const enqueueMessage = content => {
    let sent = channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)), {
        persistent: true,
        contentType: 'application/json',
    });
};
