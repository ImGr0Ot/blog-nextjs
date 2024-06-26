import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: String,
    },
    updated: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Blog", blogSchema);
