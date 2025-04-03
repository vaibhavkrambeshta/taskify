const Task = require("../models/task")
const getTasks = async (req, res) => {
    try {
        const { status } = req.query; 
        let filter = {};

        if (status) {
            filter.status = status; 
        }

        const tasks = await Task.find(filter); 
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const createTask = (async(req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const getTaskById = (async(req, res) => {
    try {
        console.log("req.params===", req.params)
        const task = await Task.findById(req.params.id).lean();
        res.status(200).json(task);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
});
const updateTask = (async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})
const deleteTask = (async(req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})
module.exports = {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
    
}