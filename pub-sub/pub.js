const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect('amqp://localhost');
  const ch = await conn.createChannel();

  const exchange = 'fExchange';
  ch.assertExchange(exchange, 'fanout', { durable: false });
  ch.publish(exchange, '', Buffer.from('Hello World!'));

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 3000)
})();
