import mysql from 'mysql2';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();


const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b1a19a11cc23ca',
    database: 'heroku_bc4830374d63828',
    password: '35db1c05'
});

export default pool.promise();

//Should change the password to an environment variable so it's not visible