// Handling the buisness logic and interacting with the User model
import User from "../model/userModel.js"

// Code for POSTing the data into the database
// create is an api (look at routes to see the URL to get this API)
export const create = async(req, res)=>{
    try{
        const userData = new User(req.body);
        const {email}= userData; // extract email from userData object

        const userExist = await User.findOne({email})
        if (userExist){
            return res.status(400).json({message: "User already exists."})
        }

        // If user doesn't already exist then save user
        const savedUser = await userData.save();
        res.status(200).json(savedUser);


    }catch(error){
        res.status(500).json({error:"Internal Server error."})
    }
}
// fetch is an api (look at routes to see the URL to get this API)
export const fetch = async (req, res)=>{
    try{
        return res.json("Hello World.")
    }catch (error){
        res.status(500).json({error:"Internal Server error."})
    }
}