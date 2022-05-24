const Task = require("../models/Task");
const User = require("../models/User");
const router = require('express').Router();

router.get('/', (req, res)=> {
    if(req.isAuthenticated()) {
        User.findById(req.user.id).populate('tasks').exec((err, user) => {
            res.send(user.tasks);
        })
    } else {
        res.redirect('http://localhost:3000');
    }
});

router.post('/', (req, res) => {
    User.findById(req.user.id).exec(()=> {
        console.log(req.body);
        const task = new Task({
            ...req.body,
            user: req.user.id
        });
        console.log(task);
        task.save().then(newTask => {
            User.findByIdAndUpdate(req.user.id, {
                $push: {'tasks': newTask.id},
                $addToSet: {'people': newTask.personAssigned, 'status': newTask.status}
            }).then(() => console.log('User updated'));
        })
    });
});

router.post('/update', (req, res)=>{
    // if(req.user._id !== req.body.user) return;
    if(!req.isAuthenticated()) return;
    Task.findByIdAndUpdate(req.body._id, {$set: req.body}, {new: true}).exec();
});

router.post('/delete', (req, res)=>{
    // if(req.user._id !== req.body.user) return;
    if(!req.isAuthenticated()) return;
    Task.findByIdAndDelete(req.body._id).exec();
});


module.exports = router;