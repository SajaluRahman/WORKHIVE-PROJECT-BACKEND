const User= require('../modles/usermodel');
const bcrypt = require('bcrypt');

const register =async (req,res)=>{
    const {FirstName,LastName,UserName,dob,email,password} = req.body;
    try {
        const userExist = await User.findOne({ email});
        if(userExist){
            return res.status(400).json({msg:"User already exists"});
        }
        const HashedPassword = await bcrypt.hash(password,10);
       const user = await User.create({
            FirstName,
            LastName,
            UserName,
            dob,
            email,
            password:HashedPassword
        });
        res.status(201).json({
            msg:"User created successfully",
            user:{
                id:user._id,
                Firstname:user.FirstName,
                Lastname:user.LastName,
                Username:user.UserName,
                email:user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Server Error"});
    }
};
const login = async (req, res) => {
    const { email, password, Username } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // Check if Username matches (optional validation)
        if (Username && user.UserName !== Username) {
            return res.status(400).json({ msg: "Invalid Username" });
        }

        res.status(200).json({
            msg: "Login Successful",
            user: {
                id: user._id,
                Firstname: user.FirstName,
                Lastname: user.LastName,
                Username: user.UserName,
                email: user.email,
            },
        });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};


module.exports = {register , login};