// Handling the buisness logic and interacting with the User model
import Admin from "../model/adminModel.js"

// Code for POSTing the data into the database
export const create = async(req, res)=>{
    try{
        const adminData = new Admin(req.body);
        const {email} = adminData; // extract email from userData object

        const adminExist = await Admin.findOne({email})
        if (adminExist){
            return res.status(400).json({message: "Admin already exists."})
        }

        // If user doesn't already exist then save user
        const savedAdmin = await adminData.save();
        res.status(200).json(savedAdmin);
    }catch(error){
        res.status(500).json({error:"Internal Server error."})
    }
}

// Get
export const fetch = async (req, res)=>{
    try{
        const adminData = new Admin(req.query);
        const {email, password} = adminData; // extract email from userData object
        
        const admin = await Admin.findOne({email});
        console.log(admin);
        // plaintext pass... seems secure ¯\_(ツ)_/¯
        if (!admin){
            return res.status(400).json({message: "Admin doesn't exist."})
        }
        
        const expected_pass = admin.password;
        if (password === expected_pass) {
            return res.status(200).send('Hi admin ' + admin.name);
        } else {
            return res.status(401).send('wrong password');
        }

    } catch (error){
        console.log("Error: " + error);
        return res.status(500).json({error:"Internal Server error."})
    }
}

// Patch
export const change_pass = async (req, res)=>{
    try{
        const old_pass = req.body.old_pass;
        const new_pass = req.body.new_pass;
        const email = req.body.email;
        
        const admin = await Admin.findOne({email});
        console.log(admin);

        // plaintext pass... seems secure ¯\_(ツ)_/¯
        if (!admin){
            return res.status(400).json({message: "Admin doesn't exist."})
        }
        
        const expected_pass = admin.password;
        if (admin.password === old_pass) {
            admin.password = new_pass;
            const savedAdmin = await admin.save();
            return res.status(200).send(savedAdmin);
        } else {
            return res.status(401).send('wrong password, password not changed');
        }

    } catch (error){
        console.log("Error: " + error);
        return res.status(500).json({error:"Internal Server error."})
    }
}

// Delete
export const delete_admin = async (req, res)=>{
    try{
        const pass = req.body.pass;
        const email = req.body.email;
        
        const admin = await Admin.findOne({email});
        console.log(admin);

        // plaintext pass... seems secure ¯\_(ツ)_/¯
        if (!admin){
            return res.status(400).json({message: "Admin doesn't exist."})
        }
        
        const expected_pass = admin.password;
        const admin_name = admin.name;
        if (admin.password === pass) {
            await admin.deleteOne();
            return res.status(200).send('admin ' + admin_name + ' deleted');
        } else {
            return res.status(401).send('wrong password, admin not deleted');
        }

    } catch (error){
        console.log("Error: " + error);
        return res.status(500).json({error:"Internal Server error."})
    }
}