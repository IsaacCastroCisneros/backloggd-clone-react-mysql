import express from 'express';

const app = express();

app.get('/',(req,res)=>
{
    res.json('qui estoy')
})

app.listen(4000,()=>
{
    console.log('listen on 5000 port')
})