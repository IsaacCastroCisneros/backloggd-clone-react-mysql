import express from 'express';

const app = express();

app.get('/',(req,res)=>
{
    res.json('qui estoy')
})

app.listen(process.env.PORT||3000,()=>
{
    console.log('listen on 3000 port')
})