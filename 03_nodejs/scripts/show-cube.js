
const ws = new WebSocket('ws://localhost:7000');


let kafka_msg = 0;

ws.onmessage = function(msg) {
    //document.querySelector('#messages').innerHTML += `<div>${msg.data}</div>`;
    //console.log(msg.data)
    kafka_msg = msg.data;
};

/////////////////////////////
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




//const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

const geometry2 = new THREE.SphereGeometry( 5, 32, 32 );
const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const sphere = new THREE.Mesh( geometry2, material2 );
scene.add( sphere );


camera.position.z = 15;



const animate = function () {
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    //sphere.translateOnAxis('x',kafka_msg - 10);
    sphere.position.x = kafka_msg - 10;

    //console.log(kafka_msg - 10);

    renderer.render( scene, camera );
};

animate();
