const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

console.log('schedule route loaded');

router.get('/', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/signin');
  const schedules = await Schedule.findByUserId(req.user.id);
  res.render('calendar', { schedules });
});

router.post('/add', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/signin');
  const { title, description, start, end } = req.body;
  await Schedule.create(req.user.id, title, description, start, end);
  res.redirect('/schedule');
});

module.exports = router;