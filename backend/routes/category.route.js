import Express from "express";
import categoryController from "../controller/category.controller.js";

const categoryRouter = Express.Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post("/create", categoryController.createCategory);
categoryRouter.put("/edit", categoryController.editCategory);
categoryRouter.delete("/delete", categoryController.deleteCategory);
categoryRouter.get("/search/:key", categoryController.searchCategory);

export default categoryRouter;
