import {NewProjectEntity, ProjectEntity} from "../types";
import { ValidationError } from "../utlils/errors";

export class ProjectRecord implements ProjectEntity{
    id: string;
    projectName: string;

    constructor(obj: NewProjectEntity) {
        if (!obj.projectName || obj.projectName.length > 30) {
            throw new ValidationError("Nazwa projektu nie może być pusta, ani przekraczać 30 znaków.");
        }

        this.projectName = obj.projectName;
    }
}