const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    category: [
      {
        type: String,
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: [{ type: Date, required: true }],

    status: {
      type: String,
      default: "created",
      enum: ["created", "inprogress", "complete"],
    },
    deadline: {
      type: Date,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
