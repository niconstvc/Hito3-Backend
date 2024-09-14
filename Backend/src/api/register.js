// backend/routes/register.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ username, password: hashedPassword });


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro' });
  }
});

module.exports = router;
