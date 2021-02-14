#

The objective of this project is to redirect the messages froma kafka broker into the a web browser using nodejs.

The current set up is composed of 3 components (not counting the broker), 1) a kafka consumer that reads messages from the broker and redirects them to a websocket server, 2) the web socket server that sends any input data to all connected clients, and 3) a server that serves the html.

## Usage

```
# Turn on the websockets server
$ node ./ws-server.js
```

```
# Turn on the kafka consumer
$ node ./kafka-consumer.js
```

```
# Run the server that will provide the html file to the browser
$ node ./server.js
```
