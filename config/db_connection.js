import mysql from 'mysql';
import 
{ 
    DB_HOST, 
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
} from './config.js';



const db = mysql.createConnection(
    {
        host:DB_HOST,
        user:DB_USER,
        password:DB_PASSWORD,
        database:DB_NAME
    }
)

db.connect(err=>
{
    if(err)return console.log('failed to connect '+err)
    console.log('successfully connected with mysql')
})

export{db}