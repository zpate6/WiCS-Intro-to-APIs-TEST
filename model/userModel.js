// Defines the user object that is read in from the mongodb database
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    }
})

export default mongoose.model("users", userSchema);