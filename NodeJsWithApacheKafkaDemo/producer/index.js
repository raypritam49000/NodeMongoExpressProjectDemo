const express = require('express');
const app = express();
require('dotenv').config();
const HOST = process.env.PRODUCER_HOST || 'localhost';
const PORT = process.env.PRODUCER_PORT || 3000;
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-producer',
    brokers: ['localhost:9092']
})

const producer = kafka.producer();
const topic = 'test-topic';

const run = async () => {
    // Producing
    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [
            { value: 'Hello KafkaJS user!' },
        ],
    })
}

 run();


app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
});

// npm run start:producer
// npm run start:consumer

