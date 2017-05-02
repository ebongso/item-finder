const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://ebongso_item:bPbB^2fK56Ds@ds123361.mlab.com:23361/item-finder', ['tasks']);

router.get('/tasks', (req, res, next) => {
  db.tasks.find((err, tasks) => {
    if(err) return res.send(err);

    res.json(tasks);
  });
});

router.get('/task/:id', (req, res, next) => {
  db.tasks.findOne({ _id : mongojs.ObjectId(req.params.id) }, (err, task) => {
    if(err) return res.send(err);

    res.json(task);
  });
});

router.post('/task/:id', (req, res, next) => {
  const task = req.body;
  if(!task.title || (task.isDone)) {
    res.status(400);
    res.json({ 'error' : 'Bad data' });
  } else {
    db.tasks.save(task, (err, task) => {
      if(err) return res.send(err);

      res.json(task);
    });
  }
});

router.delete('/task/:id', (req, res, next) => {
  db.tasks.remove({ _id : mongojs.ObjectId(req.params.id) }, (err, task) => {
    if(err) return res.send(err);

    res.json(task);
  });
});

router.put('/task/:id', (req, res, next) => {
  const task = req.body;
  let updateTask = {};

  if(task.isDone) {
    updateTask.isDone = task.isDone;
  }
  if(task.title) {
    updateTask.title = task.title;
  }
  if(updateTask) {
    db.tasks.update({ _id : mongojs.ObjectId(req.params.id) }, updateTask, {}, (err, task) => {
      if(err) return res.send(err);

      res.json(task);
    });
  } else {
    res.status(400);
    res.json({ 'error' : 'Bad data' });
  }
});

module.exports = router;