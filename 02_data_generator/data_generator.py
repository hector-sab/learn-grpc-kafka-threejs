import time

import numpy as np
from confluent_kafka import Producer

from payload_pb2 import Distance


class DistanceGenerator:
    """
    Usage:
    >>> generator = DistanceGenerator(max_iters=2)
    >>> for data in generator:
    ...     print(data)
    10.1234
    9.897
    """

    def __init__(self, distance=10, perturbe=False, max_iters=0):
        """
        Args:
            distance: Default "True" distance.
            perturbe: Include more than gaussian noise to the generated data.
            max_iters: Maximum number of data to be generated. Zero indicate
                an unlimited number of samples.
        """
        self.distance = distance
        self.perturbe_data = perturbe
        self.total_iters = 0
        self.max_iters = max_iters

    def __iter__(self):
        return self

    def __next__(self):
        if self.max_iters > 0 and self.total_iters >= self.max_iters:
            raise StopIteration

        self.total_iters += 1
        if not self.perturbe_data:
            mu, sigma = 10, 1 / 3
            sigma = 3
            return np.random.normal(mu, sigma)
        else:
            return self.perturbed_data()

    def perturbed_data(self):
        # Normal noise with no perturbances
        rand = np.random.random()
        if rand > 0.6:
            distance = np.random.normal(10, 1 / 3)
        # Noise and perturbance
        elif rand > 0.3:
            distance = np.random.normal(10, 1.5) + np.random.normal(0, 5)
        else:
            distance = np.random.normal(14, 2) + np.random.normal(5, 8)

        if distance < 0:
            distance = 0
        return distance


if __name__ == "__main__":
    iterator = DistanceGenerator()

    settings = {"bootstrap.servers": "localhost:9092"}
    producer = Producer(settings)

    while distance := next(iterator):
        payload = Distance()
        payload.value = distance
        producer.produce("grpc-test", payload.SerializeToString())

        time.sleep(1)
