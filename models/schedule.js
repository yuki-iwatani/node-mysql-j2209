const knex = require('../db/knex');

module.exports = {
  findByUserId: (userId) => {
    return knex('schedules').where({ user_id: userId }).orderBy('start', 'asc');
  },
  create: (userId, title, description, start, end) => {
    return knex('schedules').insert({ user_id: userId, title, description, start, end });
  },
  // 必要に応じてupdate, deleteも追加
};