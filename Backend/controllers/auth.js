import { hashSync, compareSync } from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = hashSync(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    const savedUser = await newUser.save();

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Signup Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      message: 'User logged in successfully',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Signin Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
