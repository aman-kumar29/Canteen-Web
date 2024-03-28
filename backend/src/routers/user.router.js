import { Router } from "express";
import jwt from 'jsonwebtoken';
import { sampleUsers } from "../data.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";

const router = Router();

router.post('/login', (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(BAD_REQUEST).send('Email or Password Not Given');
    }

    const user = sampleUsers.find(
        (user)=> user.email === email
    )
    if(user && user.password === password){
        res.send(generateTokenResponse(user));
        return;
    }
    res.send(BAD_REQUEST).send('Username or password is invalid');
})
const generateTokenResponse = (user) => {
    const token = jwt.sign(
        {
            id:user.id,
            email:user.email,
            isAdmin:user.isAdmin,
        },
        "SomeRandomText",
        {
            expiresIn : '30d'
        }
    )
    return {
        id:user.id,
        email:user.email,
        name:user.name,
        address:user.address,
        isAdmin:user.isAdmin,
        token:token,
    }
};
export default router;