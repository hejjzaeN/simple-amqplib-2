const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect('amqp://localhost');
  const ch = await conn.createChannel();

  const exchange = 'fExchange';
  ch.assertExchange(exchange, 'fanout', { durable: false });

  const q = await ch.assertQueue('', { exclusive: true });
  ch.bindQueue(q.queue, exchange, '');

  ch.consume(q.queue, msg => {
    if (msg.content) {
      console.log(' [x] %s', msg.content.toString());
    }
  }, {
    noAck: true
  });
})();
