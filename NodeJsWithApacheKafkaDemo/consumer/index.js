const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.CONSUMER_HOST || 'localhost';
const PORT = process.env.CONSUMER_PORT || 3000;
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-consumer',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' });
const topic = 'test-topic';

const run = async () => {
    // Consumer
    await consumer.connect()
    await consumer.subscribe({ topics: [topic] });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({ partition, offset: message.offset, value: message.value.toString() })
        }
    });


}

run().catch(console.error);


app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
});
