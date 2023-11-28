const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect('amqp://localhost:5672');
  const ch = await conn.createChannel();

  await ch.assertQueue('hello');

  ch.sendToQueue('hello', Buffer.from('Hello world!'));
})();
