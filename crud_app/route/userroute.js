const express = require('express');
//to import the express module of packages 



const router = express.Router();


const User = require('../model/user');

// CREATE
router.post('/', async (req, res) => {
  try {
    const lastUser = await User.findOne().sort({ id:-1});
    const nextId = lastUser ? lastUser.id + 1 : 1;
    const user = new User({ id: nextId, ...req.body });
    await user.save();
    res.status(201).send(user);
    console.log('User created successfully');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
    console.log('Users displayed successfully');
  } 
  catch (error) {
    res.status(500).send({
      message: 'Server error fetching users',
      error: error.message
    });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).send({ error: 'Invalid id' });

    const user = await User.findOne({ id });
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send(user);
    console.log('User displayed successfully');
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).send({ error: 'Invalid id' });

    const user = await User.findOneAndUpdate({ id }, req.body, { new: true });
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).send({ error: 'Invalid id' });

    const user = await User.findOneAndDelete({ id });
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
