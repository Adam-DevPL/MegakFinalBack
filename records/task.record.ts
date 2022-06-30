import {NewTaskEntity, TaskEntity, TaskRecordResults} from "../types";
import {ValidationError} from "../utlils/errors";
import {pool} from "../utlils/db";

export class TaskRecord implements TaskEntity {
    completed: boolean;
    id: string;
    projectId: string;
    taskName: string;

    constructor(obj: NewTaskEntity) {
        // console.log(obj.taskName);
        if (!obj.taskName || obj.taskName.length > 50) {
            throw new ValidationError("Nazwa zadania nie może być pusta, ani przekraczać 50 znaków.");
        }

        this.id = obj.id;
        this.taskName = obj.taskName;
        this.projectId = obj.projectId;
        this.completed = obj.completed;
    }

    static async getOne(id: string): Promise<TaskEntity> {
        const [results] = await pool.execute("SELECT * FROM `tasks` WHERE id = :id", {
            id,
        }) as TaskRecordResults;

        console.log(results[0]);

        return results.length === 0 ? null : new TaskRecord(results[0]);
    }
}