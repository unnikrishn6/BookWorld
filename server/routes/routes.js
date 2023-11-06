const express = require("express");
const book = require("../models/books");
const user = require("../models/users");
const request = require("../models/requests");
const bill = require("../models/billings");
const router = express();


router.get("/getAll", async (req, res) => {
  try {
    const data = await book.find();
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/add", async (req, res) => {
  const data = new book({
    name: req.body.name,
    src: req.body.src,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post("/request", async (req, res) => {
  const data = new request({
    book: req.body.book
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post("/bill", async (req, res) => {
  const data = new bill({
    name: req.body.name,
    phone: req.body.phone,
    grandTotal: req.body.grandTotal,
    cartList: req.body.cartList
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getBill", async (req, res) => {
  try {
    const data = await bill.find({}).sort({ _id: -1 }).limit(1);
    res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findByIdAndDelete(id);
    res.json(data);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Create a new user
    const newUser = new user({ username, password });
    await newUser.save();
    return res.status(201).json({ message: 'Signup successful' });
  } 

  catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const validUser = await user.findOne({ username, password });
    if (!validUser) {
      return res.status(401).json({ status: false, message: 'Invalid credentials' });
    }

    const uid = validUser._id.toString();
    return res.status(200).json({ status: true, uid, message: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Server error' });
  }
});


module.exports = router;