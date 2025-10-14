// Defines the user object that is read in from the mongodb database
import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    flavor:{
        type:String,
        required: true
    },
    size:{
        type:String,
        required: true
    }
})

export default mongoose.model("cakes", cakeSchema);