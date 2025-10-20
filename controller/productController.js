// Handling the buisness logic and interacting with the User model
import Product from "../model/productModel.js"

// Code for POSTing the data into the database
export const create = async(req, res)=>{
    try{
        const productData = new Product(req.body);
        const {name, size}= productData; // extract name and size from object

        const productExist = await Product.findOne({name, size})
        if (productExist){
            return res.status(400).json({message: "Product already exists."})
        }

        // If user doesn't already exist then save user
        const savedProduct = await productData.save();
        res.status(200).json(savedProduct);

    }catch(error){
        res.status(500).json({error:"Internal Server error."})
    }
}

// // get all users in database
// export const fetch = async (req, res)=>{
//     try{
//         const users = await User.find();
//         // if there are no users:
//         if (users.length === 0) {
//             return res.status(404).json({messge: "user not found"});
//         }
//         return res.status(200).json(users)

//     }catch (error){
//         res.status(500).json({error:"Internal Server error."})
//     }
// }



// // business logic - updates an existing user
// export const update = async (req, res)=>{
//     try{
//         const id = req.params.id

//         // check if user exists in the db
//         const userExists = await User.findOne({_id:id});
//         if (!userExists) {
//             return res.status(404).json({messge: "user not found"});
//         }
//         const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true});
//         return res.status(201).json(updateUser)
//     }
//     catch (error){
//         res.status(500).json({error:"Internal Server error."})
//     }
// }


// // Delete a user
// export const deleteUser = async (req, res)=>{
//     try{

//         const id = req.params.id
//         // check if user exists in the db
//         const userExists = await User.findOne({_id:id});
//         if (!userExists) {
//             return res.status(404).json({messge: "user not found"});
//         }
//         await User.findByIdAndDelete(id);
//         return res.status(201).json({message: "User deleted successfully"});
        
//     }
//     catch (error){
//         res.status(500).json({error:"Internal Server error."})
//     }
// }