import { User } from "../Model/model.js";

// 1. GET ALL
const getData = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. GET BY ID
const getDataById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User nahi mila" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Invalid ID format ya server error" });
    }
};

// 3. POST (Yahan error aa raha tha)
const postData = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Validation Failed", details: error.message });
    }
};

// 4. PUT (Update)
const putData = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!user){
            return res.status(404).json({message : "User Not Found"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 5. DELETE
const deleteData = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if(!user){
            return res.status(404).json({message : "User Not Found"})
        }

        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getData, postData, getDataById, putData, deleteData };