import Cake from "../model/cakeItem.js"

// Add item 

export const addItem = async (req, res) => {
    try {
        const userData = new Cake(req.body);
        const {id} = userData;

        const cakeExist = await Cake.findOne({_id:id});
        if (cakeExist) {
            return res.status(400).json({message: "Adding another cake to your cart."})

            // const updateCake = await Cake.findByIdAndUpdate(id, req.body, { new: true });
        } 
        // If cake doesn't already exist then save user
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    
    }catch (error) {
        res.status(500).json({ error: "Internal Server error." });
    }
}