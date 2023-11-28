const amqplib = require('amqplib');

(async () => {
  const conn = await amqplib.connect();
  const ch = await conn.createChannel();

  const exchange = 'topic-ex';
  const ROUTING_KEY = ['sys.warn', 'sys.info', 'sys.error', 'app.warn', 'app.info', 'app.error'];
  const CURRENT_ROUTE_INDEX = 5;

  ch.assertExchange(exchange, 'topic', { durable: false });
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
