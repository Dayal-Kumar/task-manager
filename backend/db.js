const mongoose = require('mongoose');
const uri = `mongodb+srv://task-manager:${process.env.MONGODB_CLIENT_PASSWORD}@cluster0.vxah7.mongodb.net/task-manager?retryWrites=true&w=majority`;
// const devuri = 'mongodb://localhost:27017/task-manager';

mongoose.connect(uri)
    .then(()=> console.log('Connected to MongoDB'))
    .catch(error => console.log(error));

mongoose.connection.on('error', err => {
    console.log(err);
});