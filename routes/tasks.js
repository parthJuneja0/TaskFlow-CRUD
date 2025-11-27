const express = require('express');
const router = express.Router();
const Tasks = require('../models/Tasks');
const fetchuser = require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1: Fetching all tasks of a user using: GET "/api/tasks/fetchalltasks".
router.get('/fetchalltasks', fetchuser, async (req, res) => {
    try {
        const tasks = await Tasks.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
});

// Route 2: Adding a task using: POST "/api/tasks/addtask".
router.post('/addtask', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    body('dueDate', 'Enter a valid due date').isISO8601(),
    body('priority', 'Priority must be Low, Medium, or High').isIn(['low', 'medium', 'high'])
], async (req, res) => {

    try {

        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() });
        }

        const { title, description, dueDate, priority } = req.body;

        const task = new Tasks({
            title,
            description,
            dueDate,
            priority,
            status: 'Pending',
            user: req.user.id
        })

        const savedTask = await task.save()
        res.json(savedTask);

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
});

// Route 3: Updating a task using: PUT "/api/tasks/updatetask/:id".
router.put('/updatetask/:id', fetchuser, async (req, res) => {

    const { title, description, dueDate, priority, status } = req.body;

    try {
        // Create a newTask object
        const newTask = {};
        if (title) { newTask.title = title };
        if (description) { newTask.description = description };
        if (dueDate) { newTask.dueDate = dueDate };
        if (priority) { newTask.priority = priority };
        if (status) { newTask.status = status };

        let task = await Tasks.findById(req.params.id)
        if (!task) { return res.status(404).send("Not Found") }

        // To check if the task belongs to the user who is updating it
        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        task = await Tasks.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true });
        res.json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
});

// Route 4: Deleting a task using: DELETE "/api/tasks/deletetask/:id".
router.delete('/deletetask/:id', fetchuser, async (req, res) => {
    try {
        let task = await Tasks.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        // To check if the task belongs to the user who is deleting it
        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        task = await Tasks.findByIdAndDelete(req.params.id);
        res.json({ success: "Task has been deleted", task: task });

    } catch (error) {
        console.error(error);
        res.status(500).json({ "error": 'An error occurred' });
    }
});

module.exports = router;