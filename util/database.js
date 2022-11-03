import mysql from 'mysql2';
import fs from "fs";
const serverCa = [fs.readFileSync("./DigiCertGlobalRootCA.crt.pem", "utf8")];
const pool = mysql.createPool({
    host: 'wbw-crm.mysql.database.azure.com',
    user: 'zach6585',
    database: 'wbwcrmdata',
    password: process.env["databasepassword"],
    port: 3306,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCa
    }
});

export default pool.promise();
