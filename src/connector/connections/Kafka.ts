'use strict'

import { Kafka } from 'kafkajs'

const createTopics = async (config: any) => {
  try {
    const { CLIENT_ID, BROKERS, TOPICS, KAFKA_USERNAME, KAFKA_PASSWORD, saslConfig } = config
    const kafka = new Kafka({
      clientId: CLIENT_ID,
      brokers: BROKERS.split(','),
      ...saslConfig,
    });

    const admin = kafka.admin();
    console.log('Connecting...');

    await admin.connect();
    console.log('Connected!');

    const topics = typeof(TOPICS) === 'string' ? [{topic: TOPICS}] : TOPICS.map((topic: string) => ({ topic: topic }))
    await admin.createTopics(topics)
    console.log('Creating topics');

    await admin.disconnect();
  } catch (err) {
    console.log('Error', err);
  }
};

const KAFKA = {
  createTopics
}

export default KAFKA
