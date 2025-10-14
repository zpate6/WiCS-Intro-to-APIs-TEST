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
        // fetch all users from the database
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).json({message:"User not found"});
        }
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({error:"Internal Server error."})
    }
}

// Request that updates an existing user 
export const update = async (req, res) => {
    try {
        //const { id } = req.params; 
        const id = req.params.id;

        // Check if user exists in the DB 
        const userExists = await User.findOne({ _id: id });
       
        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }

        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateUser);

    } catch (error) {
        res.status(500).json({ error: "Internal Server error." });
    }
}

// Delete User 
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if user exists in the DB
        const userExists = await User.findOne({ _id: id });

        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    
    } catch (error) {
        res.status(500).json({ error: "Internal Server error." });
    }
}