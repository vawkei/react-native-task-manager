import { Request, Response } from "express";
import { AppDataSource } from "../db/dbSetup";
import { TaskEntity } from "../entities/task-entity";
import { UserEntity } from "../entities/user-entity";
import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";

// interface AuthenticatedRequest extends Request {
//   user?: { userId: string; username: string };
// }

//👇👇===================createTask==========================================👇👇
export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  console.log("userId:", userId);

  const {
    enteredTitle,
    enteredDescription,
    enteredTaskStatus,
    // enteredDateWeb,
  } = req.body;
  console.log(enteredTitle, enteredDescription, enteredTaskStatus);

  const enteredDateWeb = new Date();
  console.log(enteredDateWeb);

  if (!enteredTitle || !enteredDescription || !enteredDateWeb) {
    res.status(400).json({ msg: "inputs must not be empty.." });
    return;
  }

  try {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const findUser = await userRepository.findOne({ where: { uuid: userId } });
    console.log("foundUser:", findUser);

    if (!findUser) {
      console.log("user doesn't exist");
      return;
    }

    const taskRepository = AppDataSource.getRepository(TaskEntity);

    const task = await taskRepository.save({
      title: enteredTitle,
      description: enteredDescription,
      status: enteredTaskStatus,
      dateDue: enteredDateWeb,
      user: findUser,
    });

    res.status(201).json({ msg: "new task created", task: task });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error message:", message);
    res.status(500).json({ msg: message });
  }

  // console.log("this is the create-task route");
};

//👇👇===================getTasks==========================================👇👇

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  try {
    const taskRepository = AppDataSource.getRepository(TaskEntity);
    const tasks = await taskRepository.find({
      where: { user: { uuid: userId } },
      // relations: ["user"], 📒📒//this loads the user object for each task
    });
    console.log("tasks:", tasks);

    res.status(200).json({ tasks: tasks, nbhits: tasks.length });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error message:", message);
    res.status(500).json({ msg: message });
  }

  // res.status(200).json({ msg: "this is the getTasks route" });
};

//👇👇===================getTask==========================================👇👇
export const getTask = async (req: AuthenticatedRequest, res: Response) => {
  console.log("getTask route...");
  const taskId = req.params.id;

  try {
    const taskRepository = AppDataSource.getRepository(TaskEntity);
    const task = await taskRepository.findOne({
      where: { uuid: taskId },
      // relations: ["user"],//📒📒loads the user data for the task
    });
    console.log("singleTasks:", task);
    res.status(200).json({ task: task });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error message:", message);
    res.status(500).json({ msg: message });
  }
};

//👇👇===================deleteTask==========================================👇👇

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  console.log("The delete task route...");

  const taskId = req.params.id;

  try {
    const taskRepository = AppDataSource.getRepository(TaskEntity);
    const result = await taskRepository.delete({ uuid: taskId });

    console.log("result:", result.affected);
    // result: 1

    if (result.affected === 0) {
      throw new Error("task not found");
    }

    res.status(200).json({ msg: "task deleted successfully" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error message:", message);
    res.status(500).json({ msg: message });
  }
};

//👇👇===================updateTask==========================================👇👇
export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  console.log("the Update Task route...");

  const taskId = req.params.id;
  const { enteredTitle, enteredDescription, enteredTaskStatus, enteredDate } =
    req.body;
  
  console.log("reqBody:",req.body);

  try {
    const taskRepository = AppDataSource.getRepository(TaskEntity);
    const task = await taskRepository.findOne({ where: { uuid: taskId } });

    if (!task) {
      console.log("task doesn't exist");
      return;
    }

    task.title = enteredTitle;
    task.description = enteredDescription;
    task.status = enteredTaskStatus;
    task.dateDue = enteredDate;

    await taskRepository.save(task);
    res.status(201).json({ msg: "task updated successfully" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("error message:", message);
    res.status(500).json({ msg: message });
  }
};
