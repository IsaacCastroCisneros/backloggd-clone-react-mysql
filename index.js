import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors())
app.use(express.static('dist'));

app.get('/',(req,res)=>
{
    res.json('qui estoy')
})

if(process.env.NODE_ENV!=='production')
{
    app.get('*',(req,res)=>
    {
        req.sendFile(path.resolve('dist','index.html'))
    })
}


app.listen(process.env.PORT||3000,()=>
{
    console.log('listen on 3000 port')
})