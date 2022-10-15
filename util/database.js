import mysql from 'mysql2';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();


const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bef6c7e6abb7f1',
    database: 'heroku_af22355d14aaa1b',
    password: process.env.DATABASE_PASSWORD
});

export default pool.promise();

//Should change the password to an environment variable so it's not visible