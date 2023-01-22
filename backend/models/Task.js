const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    startDate: {
      type: Date,
      required: false,
    },
    endDate: { type: Date, required: false },

    status: {
      type: String,
      default: "created",
      enum: ["created", "inprogress", "completed"],
    },
    doOnDay: {
      type: String,
      required:true

    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
