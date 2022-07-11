import {NewTaskEntity, ProjectRecordResults, TaskEntity, TaskRecordResults} from "../types";
import {ValidationError} from "../utlils/errors";
import {pool} from "../utlils/db";
import {v4 as uuid} from "uuid";

export class TaskRecord implements TaskEntity {
    completed: boolean;
    id: string;
    projectId: string;
    taskName: string;
    createdAt: Date | undefined;


    constructor(obj: NewTaskEntity) {
        // console.log(obj.taskName);
        if (!obj.taskName || obj.taskName.length > 50) {
            throw new ValidationError("Nazwa zadania nie może być pusta, ani przekraczać 50 znaków.");
        }

        this.id = obj.id;
        this.taskName = obj.taskName;
        this.projectId = obj.projectId;
        this.completed = obj.completed;
        this.createdAt = obj.createdAt;
    }

    static async getOne(id: string): Promise<TaskRecord> {
        const [results] = await pool.execute("SELECT * FROM `tasks` WHERE id = :id", {
            id,
        }) as TaskRecordResults;

        return results.length === 0 ? null : new TaskRecord(results[0]);
    }

    static async getAll(): Promise<TaskRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `tasks`") as TaskRecordResults;

        return results.length === 0 ? [] : results.map(obj => new TaskRecord(obj));
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `tasks`(`id`, `taskName`, `completed`, `projectId`) VALUES(:id, :taskName, :completed, (SELECT `id` FROM `projects` WHERE id = :projectId))", {
            id: this.id,
            taskName: this.taskName,
            completed: this.completed,
            projectId: this.projectId,
        });

        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `tasks` SET `taskName` = :taskName, `completed` = :completed, `projectId` = :projectId WHERE `id` = :id", {
            id: this.id,
            taskName: this.taskName,
            completed: this.completed,
            projectId: this.projectId,
        });
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `tasks` WHERE `id` = :id", {
            id: this.id,
        })
    }
}