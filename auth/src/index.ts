import express from 'express'
import 'express-async-errors'
import {json} from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentuserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express();
app.set('trust proxy', true); // trust traffic from ingress nginx
app.use(json());
app.use(
    cookieSession({
        signed: false, // no encryption needed because JWT is encrypted
        secure: true
    })
)

app.use(currentuserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.use(errorHandler)

app.all('*', async (req,res)=> {
    throw new NotFoundError();
})
 
const start = async ()=> {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined!')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to mongodb')
    } 
    catch (err) {
        console.error(err);
    }
 
    app.listen(3000, ()=> {
        console.log('Listening on 3000')
    })
}

start();
