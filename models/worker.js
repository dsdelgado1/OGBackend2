import db from '../util/database.js'; // The database pool we're getting the information/sending information to
import validator from "email-validator";

class Worker{
    constructor(id, name, email, admin){
        this.id = id;
        this.name = name;
        this.email = email;
        this.admin = admin;
    }
    save(){
        /* The purpose of this function is to save a new element to the database. */
        return db.execute(`INSERT INTO workers (name, email, admin) VALUES(?, ?, ?)`, [this.name, this.email, this.admin]);
    }

    workerValidator(){
        return this.name !== "" && this.email !== "" && validator.validate(this.email);
    }

    static workerUniquenessChecker(element_email){
        // Determines if worker email is unique as to not have overlaps  
        return db.execute('SELECT * FROM workers WHERE workers.email = ?', [element_email]);
    }

    static findByID(element_id){
        // Will give us a specific element based on the id 
        return db.execute('SELECT * FROM workers WHERE workers.id = ?', [element_id]);
    }

    static all(){
        /* Will give us all of the elements within the database */
        return db.execute('SELECT * FROM workers');
    }
    
}

export default Worker
