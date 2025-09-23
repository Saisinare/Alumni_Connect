import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ALLOWED_ROLES } from '../utils/roles.js';

function generateToken(payload) {
  const secret = process.env.JWT_SECRET || 'dev_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn });
}

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body || {};

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'name, email, password, role are required' });
    }
    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userDoc = await User.create({ name, email, passwordHash, role });
    const token = generateToken({ id: userDoc.id, email: userDoc.email, role: userDoc.role, name: userDoc.name });

    return res.status(201).json({
      user: { id: userDoc.id, name: userDoc.name, email: userDoc.email, role: userDoc.role },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password, role } = req.body || {};
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'email, password, role are required' });
    }
    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const userDoc = await User.findOne({ email: email.toLowerCase() });
    if (!userDoc || userDoc.role !== role) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, userDoc.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: userDoc.id, email: userDoc.email, role: userDoc.role, name: userDoc.name });
    return res.json({ user: { id: userDoc.id, name: userDoc.name, email: userDoc.email, role: userDoc.role }, token });
  } catch {
    return res.status(500).json({ message: 'Login failed' });
  }
}


