const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect('amqp://localhost');
  const ch = await conn.createChannel();

  await ch.assertQueue('hello');

  ch.consume('hello', msg => {
    const secs = msg.content.toString().split('.').length - 1;

    console.log(" [x] Received %s", msg.content.toString());

    setTimeout(() => {
      console.log(`Worker has done the job`, secs * 1000);
    });
  }, { noAck: true })
})();
