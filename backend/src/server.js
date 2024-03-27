import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRouter from './routers/food.router.js'
import userRouter from './routers/user.router.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors(
        {
            credentials : true,
            origin:['http://localhost:3000'],
        }
    )
);

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT, ()=>{
        console.log("Listening on Port ", PORT);
    }
)