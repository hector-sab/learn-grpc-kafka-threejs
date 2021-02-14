import uuid
from confluent_kafka import Consumer, KafkaError
from payload_pb2 import Distance

settings = {
    "bootstrap.servers": "localhost:9092",
    # "group.id": "mygroup2",
    "group.id": str(uuid.uuid4()),
    # "client.id": "client-1",
    "enable.auto.commit": True,
    "session.timeout.ms": 6_000,
    "default.topic.config": {"auto.offset.reset": "smallest"},
}


consumer = Consumer(settings)

consumer.subscribe(["grpc-test"])

try:
    while True:
        msg = consumer.poll(0.1)
        if msg is None:
            continue
        elif not msg.error():
            d = Distance.FromString(msg.value())
            print(f"Received message: {d.value}")
        elif msg.error().code() == KafkaError._PARTITION_EOF:
            print(f"End of partition reached {msg.topic()}/{msg.partition()}")
        else:
            print(f"Error occured: {msg.error().str()}")
except KeyboardInterrupt:
    pass
finally:
    consumer.close()
