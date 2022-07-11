import {Request, Response, Router} from "express";
import {ValidationError} from "../utlils/errors";
import {TaskRecord} from "../records/task.record";
import {NewTaskEntity, SetCompletedForTask, SetProjectForTaskReq, SetTaskNameReq, TaskEntity} from "../types";
import {ProjectRecord} from "../records/project.record";

export const taskRouter = Router()
    .get("/", async (req, res) => {

        const tasks = await TaskRecord.getAll();
        res.json({
            tasks,
        });
    })
    .post("/", async (req, res) => {
        const newProject = new TaskRecord(req.body as NewTaskEntity);
        await newProject.insert();

        res.json(newProject);
    })
    .patch('/:id', async (req: Request, res: Response) => {

        const {body}: {
            body: SetTaskNameReq,
        } = req;

        const task: TaskRecord = await TaskRecord.getOne(req.params.id);
        // console.log(body);

        if (task === null) {
            throw new ValidationError("Didn't find task with this ID.");
        }
        task.taskName = body.taskName;

        // console.log({...task});

        await task.update();

        res.json(task);
    })
    .patch('/update/:id', async (req: Request, res: Response) => {

        const {body}: {
            body: SetCompletedForTask,
        } = req;

        const task: TaskRecord = await TaskRecord.getOne(req.params.id);

        if (task === null) {
            throw new ValidationError("Didn't find task with this ID.");
        }


        task.completed = body.completed;

        await task.update();

        res.json(task);
    })
    .delete("/:id", async (req, res) => {
        const task = await TaskRecord.getOne(req.params.id);

        if (!task) {
            throw new ValidationError("No such task.")
        }

        await task.delete();

        res.end();
    })