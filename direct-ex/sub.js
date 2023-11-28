const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect();
  const ch = await conn.createChannel();

  const exchange = 'direct-ex';
  // Run the first instace, then extend the array and run the second instance
  const ROUTING_KEY = ['error'];

  ch.assertExchange(exchange, 'direct', { durable: false });

  const q = ch.assertQueue('', { exclusive: true });

  ROUTING_KEY.forEach(key => {
    ch.bindQueue(q.queue, exchange, key);
  });

  ch.consume(q.queue, msg => {
    if (msg.content) {
      console.log(' [x] %s: "%s"', msg.fields.routingKey, msg.content.toString());
    }
  });
})();
