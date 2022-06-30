import {NewProjectEntity, ProjectEntity, ProjectRecordResults} from "../types";
import { ValidationError } from "../utlils/errors";
import {pool} from "../utlils/db";

export class ProjectRecord implements ProjectEntity{
    id: string;
    projectName: string;

    constructor(obj: NewProjectEntity) {
        if (!obj.projectName || obj.projectName.length > 30) {
            throw new ValidationError("Nazwa projektu nie może być pusta, ani przekraczać 30 znaków.");
        }

        this.id = obj.id;
        this.projectName = obj.projectName;
    }

    static async getOne(id: string): Promise<ProjectRecord> {
        const [results] = await pool.execute("SELECT * FROM `projects` WHERE id = :id", {
            id,
        }) as ProjectRecordResults;

        return results.length === 0 ? null : new ProjectRecord(results[0]);
    }
}