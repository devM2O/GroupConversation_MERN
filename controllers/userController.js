const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//------------------------register-----------------------//
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
  
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (!emailRegex.test(email)) throw "Invalid Email or This Email Domain is not Support";
    if (password.length < 6) throw "password must be atleast 6 charactors";

    const userExists = await User.findOne({email});
    if (userExists) throw "This Email already exits";
  
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
  
    res.json({ message: `Hello ${name}, registered successfully!` });
  };

  //------------------------login------------------------//
exports.login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user) throw "Invalid Email"
    bcrypt.compare(password, user.password,async (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
        const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    
        res.json({message: `welcome ${user.name}`, token});
        }else res.status(422).json({ error: "incorrect password" });
    })

    
};


