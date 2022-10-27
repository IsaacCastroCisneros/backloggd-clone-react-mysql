import express from 'express';
import path from 'path';
import cors from 'cors';
import { PORT } from './config/config.js';

import { signUpRouter } from './routes/sign_up.js';

const app = express();

app.use(express.json())
app.use(cors())

app.use('/sign_up',signUpRouter);

app.use(express.static('dist'));

if(process.env.NODE_ENV==='production')
{
    app.get('*',(req,res)=>
    {
        req.sendFile(path.resolve('dist','index.html'))
    })
}

app.listen(PORT||3001,()=>
{
    console.log('listen on 3001 port')
})