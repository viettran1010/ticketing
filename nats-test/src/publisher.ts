import nats from 'node-nats-streaming'
import {TicketCreatedListener} from './events/ticket-created-publisher'

console.clear();
//stan = client
const stan = nats.connect('ticketing','abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async ()=> {
    console.log('publisher connected to NATS')

    const publisher = new TicketCreatedListener(stan);
    try {
        await publisher.publish({
            id: '123',
            title: 'concert1',
            price: 20
        })
    }
    catch(err) {
        console.error(err);
    }
})
