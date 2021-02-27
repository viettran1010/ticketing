import request from 'supertest';
import { app } from '../../app';
import {Ticket} from '../../models/ticket'

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});
    expect(response.status).not.toEqual(404)
});

it('can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)     
});

it('doesnt returns 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({})

    expect(response.status).not.toEqual(401)
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400)
        
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
        })
        .expect(400)
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: -10
        })
        .expect(400)
        
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'adwa'
        })
        .expect(400)
});

it('creates a ticket with valid inputs', async () => {
    // add in a check to make sure ticket was saved to mongo
    let tickets = await Ticket.find({}).exec();
    expect(tickets.length).toEqual(0)

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'dwad',
            price: 20
        })
        .expect(201)

    tickets = await Ticket.find({}).exec();
    expect(tickets.length).toEqual(1);
});
