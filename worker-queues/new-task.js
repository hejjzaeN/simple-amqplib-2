const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect('amqp://localhost');
  const ch = await conn.createChannel();

  const task = process.argv.slice(2).join(' ') || 'Hello world!';
  console.log(task);

  await ch.assertQueue('hello');

  ch.sendToQueue('hello', Buffer.from(task), {
    persistent: true
  });
})();
