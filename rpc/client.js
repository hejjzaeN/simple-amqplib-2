const amqplib = require('amqplib/callback_api');

function generateUuid() {
  return Math.random().toString() +
          Math.random().toString() +
          Math.random().toString();
}

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) {
    process.exit(-1);
  }

  const num = 4;

  conn.createChannel((err, channel) => {
    const id = generateUuid();
    channel.assertQueue('', { exclusive: true }, (err, q) => {
      channel.consume(q.queue, msg => {
        if (msg.content && msg.properties.correlationId == id) {
          console.log(' [.] Got %s', msg.content.toString());
          setTimeout(() => {
            conn.close();
            process.exit(0)
          }, 500);
        }
      }, {
        noAck: true
      });

      channel.sendToQueue('rpc_queue', Buffer.from(num.toString()), {
        replyTo: q.queue,
        correlationId: id
      });
    })
  });
})

