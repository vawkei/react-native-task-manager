import { Router } from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task-controller";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";

const taskRouter:Router = Router();

taskRouter.post("/create-task",authenticationMiddleware,createTask);
taskRouter.get("/get-tasks",authenticationMiddleware,getTasks);
taskRouter.get("/get-task/:id",authenticationMiddleware,getTask);
taskRouter.delete("/delete-task/:id",authenticationMiddleware,deleteTask);
taskRouter.patch("/update-task/:id",authenticationMiddleware,updateTask)

export default taskRouter