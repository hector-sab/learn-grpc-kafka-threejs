// https://github.com/Blizzard/node-rdkafka#standard-api-1
var Kafka = require('node-rdkafka')
const WebSocket = require('ws');
const { Distance } = require('./payload_pb.js')


// WebSocket client
const ws = new WebSocket('ws://localhost:7000')


// Configure the consumer
var consumer = new Kafka.KafkaConsumer({
    'group.id': 'js-test',
    'metadata.broker.list': 'localhost:9092',
}, {});

async function ws_start() {
    await new Promise(function(resolve){
        ws.once('open', resolve);
    });
};


// Connect
consumer.connect();


// Read messages
consumer
    .on('ready', function() {
        // Subscribe to the librdtesting-01 topic
        // This makes subsequent consumes read from that topic.
        consumer.subscribe(['grpc-test']);

        // Read one message every 1000 milliseconds
        setInterval(function() {
          consumer.consume(1);
        }, 1000);
    })
    .on('data', function(data) {
        console.log('Message found!  Contents below.');
        let distance = new Distance.deserializeBinary(data.value);
        console.log(distance.array[0]);

        ws.send(distance.array[0])
    });
