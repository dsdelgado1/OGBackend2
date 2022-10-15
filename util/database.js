import mysql from 'mysql2';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'wbw-crm',
    password: process.env.DATABASE_PASSOWORD
});

export default pool.promise();

//Should change the password to an environment variable so it's not visible