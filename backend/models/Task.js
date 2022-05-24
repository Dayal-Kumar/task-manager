const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    personAssigned: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;