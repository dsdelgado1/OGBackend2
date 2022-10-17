import mysql from 'mysql2';

console.log(process.env)
const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b1a19a11cc23ca',
    database: 'heroku_bc4830374d63828',
    password: process.env.DATABASE_PASSWORD
});

export default pool.promise();

//Should change the password to an environment variable so it's not visible