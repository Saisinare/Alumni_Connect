import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { authenticateJwt } from '../middleware/auth.middleware.js';

const router = Router();

// Unified endpoints with role specified in body
router.post('/register', register);
router.post('/login', login);

// Optional role-specific convenience endpoints
router.post('/student/register', (req, res, next) => {
  req.body = { ...(req.body || {}), role: 'student' };
  return register(req, res, next);
});
router.post('/student/login', (req, res, next) => {
  req.body = { ...(req.body || {}), role: 'student' };
  return login(req, res, next);
});

router.post('/alumni/register', (req, res, next) => {
  req.body = { ...(req.body || {}), role: 'alumni' };
  return register(req, res, next);
});
router.post('/alumni/login', (req, res, next) => {
  req.body = { ...(req.body || {}), role: 'alumni' };
  return login(req, res, next);
});

router.post('/admin/register', (req, res, next) => {
  req.body = { ...(req.body || {}), role: 'admin' };
  return register(req, res, next);
});
router.post('/admin/login', (req, res, next) => {
  req.body = { ...(req.body || {}), role: 'admin' };
  return login(req, res, next);
});

// Token verification / profile endpoint
router.get('/me', authenticateJwt, (req, res) => {
  const { id, email, role, name } = req.user;
  res.json({ user: { id, email, role, name } });
});

export default router;


