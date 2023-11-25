const express = require('express');
const Task = require('../model/Tasks');
const taskRouter = express.Router();

taskRouter.get('/tasks', async (req, res) => {
    try {
        let query = Task.find();
        let searchObj = {};
        let sortObj = {};
        let { searchBytitle, sortByTitle, filter } = req.query;
        if (searchBytitle) {
            searchObj.title = new RegExp(searchBytitle, 'i');
        }
        if (sortByTitle === 'asc') {
            sortObj.title = 1;
        } else if (sortByTitle === 'desc') {
            sortObj.title = -1;
        }

        if (filter === "CompletedTasks") {
            searchObj.status = true;
        } else if (filter === "DueTasks") {
            const ltgt = {};
            var today = new Date();
            var nextSevenDays = new Date();
            nextSevenDays.setDate(today.getDate() + 7);
            ltgt.$gte = today;
            ltgt.$lte = nextSevenDays;
            searchObj.status = false;
            searchObj.due_date = ltgt;
        }
        const TaskList = await query.find(searchObj).collation({ locale: 'en' }).sort(sortObj);
        res.status(200).json({
            "message": "OK",
            count: TaskList.length,
            TaskList
        })
    } catch (error) {
        res.status(404).json({
            "message": "error",
        })
    }
})
taskRouter.get('/stats', async (req, res) => {
    // - ** Task Statistics:** Implement an aggregate pipeline to 
    //     calculate statistics, such as 
    //    1) the total number of tasks, 
    //     2)the number of completed tasks, 
    //  3)the number of tasks due in the next 7 days.

    try {
        var today = new Date();
        var nextSevenDays = new Date();
        nextSevenDays.setDate(today.getDate() + 7);
        let group = {
            $group: {
                _id: null,
                totalNoOfTasks: { $sum: 1 },
                noOfCompletedTasks: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$status", true] }, then: 1, else: 0
                        }
                    },

                },

                dueTasks: {
                    $sum: {
                        $cond: {
                            if: {
                                $and: [
                                    { $gte: ["$due_date", today] },
                                    { $lte: ["$due_date", nextSevenDays] },
                                    { $eq: ["$status", false] }
                                ]
                            }, then: 1, else: 0
                        }
                    },
                }
            }
        };
        let project = {
            $project: {
                totalNoOfTasks: 1,
                noOfCompletedTasks: 1,
                dueTasks: 1
            }
        };
        let pipline = [group, project];
        const data = await Task.aggregate(pipline);
        res.json(
            data
        )
    } catch (error) {

    }
})
taskRouter.post('/tasks', async (req, res) => {
    try {
        const TaskList = await Task.create(req.body);
        res.status(201).json({
            "message": `Created with ${TaskList._id}`,
        })
    } catch (error) {
        res.status(400).json({
            "message": "error",
        })
    }
})
taskRouter.patch('/tasks/:id', async (req, res) => {
    try {
        req.body.updated_date = new Date();
        const TaskList = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            "message": `updated`,
        })
    } catch (error) {
        res.status(400).json({
            "message": "error",
        })
    }
})
taskRouter.delete('/tasks/:id', async (req, res) => {
    try {
        req.body.updated_date = new Date();
        const TaskList = await Task.findByIdAndDelete(req.params.id);
        res.status(201).json({
            "message": "deleted",
        })
    } catch (error) {
        res.status(400).json({
            "message": "error",
        })
    }
})
module.exports = taskRouter;