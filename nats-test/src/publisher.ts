import nats from 'node-nats-streaming'

//stan = client
const stan = nats.connect('ticketing','abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', ()=> {
    console.log('publisher connected to NATS')
})
