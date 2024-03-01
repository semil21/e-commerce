import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
