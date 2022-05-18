const Task = require('../../model/task');

const getAllTasks = (req, res) => {
  try {
    Task.find().then(result => {
      res.status(200).send({data: result});
    })
  } catch (error) {
    res.status(404).send({message: 'Fail in get all tasks'});
  }
};

const createNewTask = (req, res) => {
  try {
    const { text, isCheck } = req.body;
    if (text === '' || typeof text !== 'string' || isCheck !== false || typeof isCheck !== 'boolean') {
      throw new Error();
    }
      const task = new Task(req.body);
      task.save().then(result => {
        res.status(200).send(result);
      })
  } catch (error) {
    res.status(404).send({message: 'Fail in create task'});
  }
};

const changeTaskText = (req, res) => {
  try {
    const {_id, text} = req.body;
    if (!_id || text === '' || typeof text !== 'string') {
      throw new Error();
    }
    Task.findOneAndUpdate(
      {_id: _id},
      { $set: req.body},
      { new: true}
    ).then(() => { 
      Task.find().then(result => {          
        res.status(200).send(result);                 
      }).catch(() => {
        res.status(404).send({message: 'Fail in change task'});
      });   
    });
  } catch (error) {
    res.status(404).send({message: 'Fail in change task'});
  }
};

const changeTaskCheck = (req, res) => {
  try {
    const {_id, isCheck} = req.body;
    if (!_id || typeof isCheck !== 'boolean') {
      throw new Error();
    }
    Task.findOneAndUpdate(
      {_id: _id},
      { $set: req.body},
      { new: true}
    ).then(() => { 
      Task.find().then(result => {          
        res.status(200).send(result);                 
      }).catch(() => {
        res.status(404).send({message: 'Fail in change task'});
      });   
    });
  } catch (error) {
    res.status(404).send({message: 'Fail in change task'});
  }
};

const deleteTask = (req, res) => {
  try {
    const id = req.query.id;
    Task.deleteOne({_id: id}).then((result) => {          
      res.status(200).send(result);                 
    })
  } catch (error) {
    res.status(404).send({message: 'Fail in delete task'});
  }
};

const deleteAllTask = (req, res) => {
  try {
    Task.deleteMany({}).then(() => {
      res.status(200).send({message: 'Deleted'});
    })
  } catch (error) {
    res.status(404).send({message: 'Fail in delete tasks'});
  }
};

module.exports = {
  getAllTasks,
  createNewTask,
  changeTaskText,
  changeTaskCheck,
  deleteTask,
  deleteAllTask
};