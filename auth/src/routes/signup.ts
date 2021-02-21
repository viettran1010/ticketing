import express, {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import {RequestValidaionError} from '../errors/request-validation-errors'
import {DatabaseConnectionError} from '../errors/database-connection-errors'

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength( {min: 4, max: 20}).withMessage('Password must be 4-20 characters')
] , (req: Request,res: Response)=> {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidaionError(errors.array());
    }

    const {email, password} = req.body;

    console.log('Creating user...');

    throw new DatabaseConnectionError();

    res.send({});
})

export {router as signupRouter}
