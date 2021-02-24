import express from 'express'
import jwt from 'jsonwebtoken'


const router = express.Router();

router.get('/api/users/currentuser', (req,res)=> {
    if (!req.session?.jwt) { // no jwt in cookies, "?" is TS's check for null
        return res.send({currentuser: null})
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        res.send({currentuser: payload})
    }
    catch (err) {
        return res.send({currentuser: null})
    }
})

export {router as currentuserRouter}
