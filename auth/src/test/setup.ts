import  {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose, { connect } from 'mongoose'
import {app} from '../app'

let mongo: any;

beforeAll(async ()=> {
    process.env.JWT_KEY = 'asfafwa';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

beforeEach(async ()=> {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) { // delete collections before start
        await collection.deleteMany({});
    }
})

afterAll(async ()=> {
    await mongo.stop();
    await mongoose.connection.close();   
})
