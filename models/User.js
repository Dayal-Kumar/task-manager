const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = new Schema({
    username: String,
    googleID: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    people: [String],
    status: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
