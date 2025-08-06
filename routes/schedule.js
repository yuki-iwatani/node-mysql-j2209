const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

// サインイン認証を削除し、誰でもアクセス可能に変更
router.get('/', async (req, res) => {
  const userId = 1; // 仮のユーザーID
  const schedules = await Schedule.findByUserId(userId);

  // FullCalendar 用に ISO形式に変換
  const formatted = schedules.map(s => ({
    ...s,
    start: new Date(s.start).toISOString(),
    end: new Date(s.end).toISOString()
  }));

  res.render('calendar', { schedules: formatted });
});

router.post('/add', async (req, res) => {
  const userId = 1; // 仮のユーザーID
  const { title, description, start, end } = req.body;
  await Schedule.create(userId, title, description, start, end);
  res.redirect('/schedule');
});

module.exports = router;
