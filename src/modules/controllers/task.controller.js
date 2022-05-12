const Task = require('../../model/task');

module.exports.getAllTasks = (req, res) => {
  Task.find().then(result => {
    res.send({data: result});
  }).catch(err => res.send(err));
};

module.exports.createNewTask = (req, res) => {
  const body = req.body;

  if (body.hasOwnProperty('text')) {
    const task = new Task({
      text: body.text,
      isCheck : body.isCheck
    });
    task.save().then(result => {
      res.send(result);
    }).catch(err => res.send(err));
  };
};

module.exports.changeTaskInfo = (req, res) => {
  const body = req.body;

  // Один PATH на бэке объединяет два патча на фронте: один на изменение чекбокса, другой на изменение текста
  Task.updateOne(
    {_id: body._id},
    { $set: body},
    ).then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err);
  });
};

module.exports.deleteTask = (req, res) => {
  const id = req.query.id;
  Task.deleteOne({_id: id}).then(() => { 
    Task.find().then(result => {          
      res.send(result);                 
    }).catch(err => {
      res.send(err);
    });   
  });
};

module.exports.deleteAllTask = (req, res) => {
  Task.deleteMany({}).then(() => {
    res.send('Deleted');
  }).catch(err => {
    res.send(err);
  });
};