import {NewProjectEntity, ProjectEntity, ProjectRecordResults} from "../types";
import { ValidationError } from "../utlils/errors";
import {pool} from "../utlils/db";
import {v4 as uuid} from "uuid";

export class ProjectRecord implements ProjectEntity{
    id: string;
    projectName: string;
    createdAt: Date | undefined;

    constructor(obj: NewProjectEntity) {
        if (!obj.projectName || obj.projectName.length > 30) {
            throw new ValidationError("Nazwa projektu nie może być pusta, ani przekraczać 30 znaków.");
        }

        this.id = obj.id;
        this.projectName = obj.projectName;
        this.createdAt = obj.createdAt;
    }

    static async getOne(id: string): Promise<ProjectRecord> {
        const [results] = await pool.execute("SELECT * FROM `projects` WHERE id = :id", {
            id,
        }) as ProjectRecordResults;

        return results.length === 0 ? null : new ProjectRecord(results[0]);
    }

    static async getAll(): Promise<ProjectRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `projects`") as ProjectRecordResults;

        return results.length === 0 ? [] : results.map(obj => new ProjectRecord(obj));
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `projects`(`id`, `projectName`) VALUES(:id, :projectName)", {
            id: this.id,
            projectName: this.projectName,
        });

        return this.id;
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `projects` WHERE `id` = :id", {
            id: this.id,
        })
    }
}