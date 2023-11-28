const amqplib = require('amqplib/callback_api');

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) {
    process.exit(-1);
  }
  conn.createChannel((err, channel) => {
    channel.assertQueue('rpc_queue', { durable: false });
    channel.prefetch(1);

    channel.consume('rpc_queue', msg => {
      if (msg.content) {
        const fib = parseInt(msg.content.toString());
        console.log(' [x] Got the number %d', fib);

        const res = fibonacci(fib);

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(res.toString()), {
          correlationId: msg.properties.correlationId
        });

        channel.ack(msg);
      }
    });
  });
});
