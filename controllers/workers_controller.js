
import Worker from '../models/worker.js';

export const index = (req, res, next) =>{
    // The index method for workers that gives us all of them
    Worker.all()
    .then(([rows, fieldData]) => {
        res.json(rows);
    })
    .catch(() => res.status(500).json({message: "Something went wrong on our end. Try to reload the page and start again"}));
};

export const create = (req, res) => {
    // Here we create new workers 
    const worker = new Worker(null, req.body.name, req.body.email, req.body.admin)
    Worker.workerUniquenessChecker(worker.email)
    .then(([found_worker_element]) => {
        if (found_worker_element.length !== 0){
            res.status(406).json({message: "Company already has a worker with this email"});
        }
        
        else{
            worker.workerValidator(worker) ? 
            worker.save()
            .then((result) => {
                Worker.findByID(result[0].insertId)
                .then(([new_worker]) =>{
                    res.json(new_worker)
                })
                .catch(() => res.status(500).json({message: "Something went wrong on our end. Try to reload the page and start again"}))
                
            })
            .catch((err) => console.log(err))
            :
            res.status(406).json({message: "Either the email does not exist or you didn't include both a name and an email "})
        }
    })
    .catch(() => res.status(500).json({message: "There is already a worker with this email registered"}))
    }

