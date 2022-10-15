import db from '../util/database.js'; // The database pool we're getting the information/sending information to

class Customer{
    constructor(id, company, contact_name, contact_email, number, contact_title, old_address, new_address, category, broker_name, broker_company,
         broker_number, broker_email, architect_name, architect_company, architect_number, architect_email, consultant_name, consultant_company, consultant_number, consultant_email, notes){
        this.id = id;
        this.company = company;
        this.contact_name = contact_name;
        this.contact_email = contact_email;
        this.contact_phone_number = number;
        this.contact_title = contact_title;
        this.old_address = old_address;
        this.new_address = new_address;
        this.category = category;
        this.broker_name = broker_name;
        this.broker_company = broker_company;
        this.broker_number = broker_number;
        this.broker_email = broker_email;
        this.architect_name = architect_name;
        this.architect_company = architect_company;
        this.architect_number = architect_number;
        this.architect_email = architect_email;
        this.consultant_name = consultant_name;
        this.consultant_company = consultant_company;
        this.consultant_number = consultant_number;
        this.consultant_email = consultant_email;
        this.notes = notes;
        
    }
    async save(worker_list){
        // The purpose of this function is to save a new element to the database.
        const connection = await db.getConnection(); //acts as a means of using a connection so we can use transactions
        try{
            await connection.beginTransaction();
            const newCustomer = await connection.execute(`INSERT INTO customers (company, contact_name, contact_email, contact_phone_number, contact_title, old_address, new_address, category, broker_name, broker_company,
                broker_number, broker_email, architect_name, architect_company, architect_number, architect_email, consultant_name, consultant_company, consultant_number, consultant_email, notes) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [this.company, this.contact_name, this.contact_email, this.contact_phone_number, this.contact_title, this.old_address, this.new_address, this.category, this.broker_name, this.broker_company, this.broker_number, this.broker_email,
                this.architect_name, this.architect_company, this.architect_number, this.architect_email, this.consultant_name, this.consultant_company, this.consultant_number, this.consultant_email, this.notes]);
            
            if (!newCustomer){
                await connection.rollback();
                connection.release();
                return;
            };
            const workerCustomerIDs = [];
            for (const worker of worker_list){
                let newWorkerCustomer = await connection.execute(`INSERT INTO workercustomers (customer_id, worker_id) VALUES(?, ?)`, [newCustomer[0].insertId, worker.value]);
                workerCustomerIDs.push(newWorkerCustomer[0].insertId);
            };
            await connection.commit();
            const foundCustomer = await connection.execute('SELECT * FROM customers WHERE customers.id = ?', [newCustomer[0].insertId]);
            const allWorkerCustomers = await connection.execute(`SELECT * FROM workercustomers WHERE workercustomers.id IN ( ${workerCustomerIDs.slice(0, -1).join(", ") + workerCustomerIDs.slice(-1)})`);
            connection.release();
            return [foundCustomer, allWorkerCustomers];

        }
        catch(err){
            await connection.rollback();
            return err;
        }
    }

    customerValidator(){
        return this.company !== "" && this.contact_name !== "" && this.category !== "" 
    }

    static all(){
    // Will give us all of the elements within the database (specific to customers)
        return db.execute('SELECT * FROM customers')
    }

    static findByID(element_id){
        // Will give us a specific element based on the id 
        return db.execute('SELECT * FROM customers WHERE customers.id = ?', [element_id]);
    }

    static companyValidator(element_company){
        // Determines if company name is unique as to not have overlaps  
        return db.execute('SELECT * FROM customers WHERE customers.company = ?', [element_company]);
    }

    static updateNotes(new_notes_text, new_notes_id, old_notes){
        // Uses SQL to concatenate the existing notes with the new notes
        return db.execute('UPDATE customers SET notes = CONCAT(?, ?) WHERE id = ?', [old_notes, new_notes_text, new_notes_id]);
    }

    static async deleteMe(customer_id){
        //Uses SQL to delete an individual customer element
        const connection = await db.getConnection(); //acts as a means of using a connection so we can use transactions
        try {
            await connection.beginTransaction();
            await connection.execute('DELETE FROM customers WHERE id = ?', [customer_id]);
            await connection.execute('DELETE FROM workercustomers WHERE workerCustomers.customer_id = ?', [customer_id]);
            await connection.commit();
            connection.release();
            return;
        }
        catch (err){
            await connection.rollback();
            return err;
        } 
    }

    
    
}

export default Customer

        

