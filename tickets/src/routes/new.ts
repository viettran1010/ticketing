import express, {Request, Response} from 'express'
import { requireAuth } from '@viettickets/common';
import {body} from 'express-validator'
import {validateRequest} from '@viettickets/common'

const router = express.Router();

router.post('/api/tickets', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({ gt: 0}) // greater than 0
        .withMessage('Price must be greater than 0')

], validateRequest, (req: Request, res: Response)=> {
    res.sendStatus(200);
})

export {router as createTicketRouter}
