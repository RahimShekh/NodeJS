const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email : {type: String, unique: true},   // email should be unique
    password : String,
    name : String
})

const Todo = new Schema({
    title : String,
    done : Boolean,
    userId : ObjectId
})

const UserModel = mongoose.model('users',User); // konse database mein dalna hai
const TodoModel = mongoose.model('todos',Todo);

// User is schema and users db 

module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}

// export kare kyuki hume iski jarurat hai index.js mein use karkneko