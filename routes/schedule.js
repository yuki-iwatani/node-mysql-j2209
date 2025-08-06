const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

// /schedule にアクセス → カレンダー表示 (EJSレンダリング)
router.get('/', async (req, res) => {
  const userId = 1; // 仮のユーザーID
  const schedules = await Schedule.findByUserId(userId);

  const formatted = schedules.map(s => ({
    ...s,
    start: new Date(s.start).toISOString(),
    end: new Date(s.end).toISOString()
  }));

  res.render('calendar', { schedules: formatted });
});

// FullCalendar用イベント取得API
router.get('/api', async (req, res) => {
  const userId = 1;
  try {
    const schedules = await Schedule.findByUserId(userId);
    const events = schedules.map(s => ({
      title: s.title,
      start: new Date(s.start).toISOString(),
      end: new Date(s.end).toISOString(),
      description: s.description
    }));
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get schedules' });
  }
});

// スケジュール追加 POST
router.post('/add', async (req, res) => {
  const userId = 1;
  const { title, description, start, end } = req.body;
  try {
    await Schedule.create(userId, title, description, start, end);
    res.redirect('/schedule');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add schedule');
  }
});

module.exports = router;
