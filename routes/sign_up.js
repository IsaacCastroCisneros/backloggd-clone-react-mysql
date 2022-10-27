import express from 'express'
import { signUp } from '../util/validations.js';
import { db } from '../config/db_connection.js';

const signUpRouter = express.Router()

signUpRouter.post('/',(req,res)=>
{
    const{value,error}=signUp.validate(req.body,{abortEarly:false});

    if(error)
    {
        if(value.userName&&(value.userName?.match(/[a-z]/gi)||[]).length<3)
        {
            res.json([{message:'Username must be have 3 characters A-Z at least'},...error.details])
            return
        }

        res.json(error.details)
        return
    }

    const q = "insert into users set ?"

    const values =
    {
        name:req.body.userName,
        email:req.body.email,
        password:req.body.password
    }

    db.query
    (
      `SELECT
        name,email,
        CASE WHEN name = ? THEN name END AS name,
        CASE WHEN email = ? THEN email END AS email
        FROM users`
      ,
      [
        values.name,
        value.email
      ],
      (err, data) => 
      {
        console.log(data)
        if (err) return console.log(err);

        let error =[];

        if(data[0].name!==null)
        {
            error=[{message:'username already exist'},...error]
        }

        if(data[0].email!==null)
        {
            error=[{message:'email already exist'},...error]
        }

        if(error.length>0) return res.json(error)
        
        db.query(q,values,(err)=>
        {
            if(err)console.log(err)

            res.json('ok')
        })
      }
    );
    

})

export {signUpRouter}