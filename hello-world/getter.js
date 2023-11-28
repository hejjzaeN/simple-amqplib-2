const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect('amqp://localhost:5672');
  const ch = await conn.createChannel();

  await ch.assertQueue('hello');

  ch.consume('hello', msg => {
    if (!msg) {
      process.exit(-1);
    } else {
      console.log(
        `Message: ${msg.content.toString()}`
      );
    }
  })
})();
