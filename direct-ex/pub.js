const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect();
  const ch = await conn.createChannel();

  const exchange = 'direct-ex';
  const ROUTING_KEY = ['warn', 'info', 'error'];
  const CURRENT_ROUTE_INDEX = 1;

  ch.assertExchange(exchange, 'direct', { durable: false });
  ch.publish(
    exchange,
    ROUTING_KEY[CURRENT_ROUTE_INDEX],
    Buffer.from(`This is ${ ROUTING_KEY[CURRENT_ROUTE_INDEX] }`)
  );

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
})();
