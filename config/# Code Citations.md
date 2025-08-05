# Code Citations

## License: 不明
https://github.com/yuevo/express_todo_app/tree/e092b3bb96289c6d3949b0e8c10703d7c1ec5444/todoapp/routes/index.js

```
todo = req.body.add;
  knex("tasks")
    .insert({user_id: userId, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error
```


## License: 不明
https://github.com/strawberryisamu/todoapp/tree/0b7499e85ba71a1d16bd693131e39c83a17419cd/routes/index.js

```
)
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage:
```


## License: 不明
https://github.com/yukimarugm/webprogramming_final/tree/e673b265c70d54c3f206c4daaa9b31663a829101/webapi/routes/index.js

```
")
    .insert({user_id: userId, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index',
```


## License: 不明
https://github.com/Taiyou551/Taiyou551.gitlab.io/tree/7baba39568d09ca11ec9cce773bebf769084e1f9/index.js

```
const userId = req.user.id;
  const todo = req.body.add;
  knex("tasks")
    .insert({user_id: userId, content: todo})
    .then(function () {
      res.redirect('/')
    })
    .
```

-- schedulesテーブル例
CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start DATETIME NOT NULL,
  end DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

