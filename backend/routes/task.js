const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const passport = require("passport");

//@desc : get all tasks
//@route: GET  /api/tasks/all
// access: Public

router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find().populate("owner");
    if (!tasks) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found" });
    }
    return res.json({ success: true, tasks: tasks });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//@desc : get one task
//@route: GET api/tasks/task/taskId
//access: Private
router.get(
  "/task/:taskId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const task = await Task.findById({
        _id: req.params.taskId,
      }).populate("owner");
      if (!task) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found ." });
      }
      return res.json({ success: true, task: task });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  }
);

//@desc : create a new course
//@route: POST api/tasks/task/new
//access: Private
router.post(
  "/task/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      owner: req.user._id,
      deadline: req.body.deadline,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      category: req.body.category,
      duration: req.body.duration,
    });
    try {
      const savedTask = await newTask.save();
      return res.json({ success: true, task: savedTask });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  }
);

//@desc : update a task
//@route: PUT api/tasks/task/taskId
//access: Private
router.put(
  "/task/:taskId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const task = await Task.findById({ _id: req.params.taskId });
      console.log(String(task.owner),String(req.user._id))
      if (String(req.user._id)!==(String(task.owner))) {
        return res.status(400).json({
          success: false,
          message: "You are not allowed to update this task.",
        });
      }
      if (!req.body) {
        return res.json({ success: false, message: "Update data is empty!" });
      }
      // updated task will be the old data. a new request has to be made to see the updates
      const updatedTask = await Task.findByIdAndUpdate(
        { _id: req.params.taskId },
        req.body,
        { new: true }
      );

      return res.json({ success: true, task: updatedTask });
    } catch (err) {
      res.json({ success: false, message: err.message });
    }
  }
);

//@desc : delete a task
//@route: DELETE api/tasks/task/taskId
//access: Private

router.delete(
  "/task/:taskId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const task = await Task.findById({ _id: req.params.taskId });
      if (String(req.user._id) === String(task.owner)) {
        const deleteCount = await Task.deleteOne({
          _id: req.params.taskId,
        });

        return res.json({ success: true, task: deleteCount });
      } else {
        return res.status(400).json({
          success: false,
          message: "You do not have permission to delete this task.",
        });
      }
    } catch (err) {
      res.json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
