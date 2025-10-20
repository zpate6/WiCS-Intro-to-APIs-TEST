// Defines the product object that is read in from the mongodb database
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    size:{
        type:String,
        required: true
    },
    flavor:{
        type:[String],
        required: true
    },
    price:{
        type:Number,
        required: true
    }
})

export default mongoose.model("Product", productSchema);