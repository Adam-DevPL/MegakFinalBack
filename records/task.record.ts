import {NewTaskEntity, TaskEntity} from "../types";
import {ValidationError} from "../utlils/errors";

export class TaskRecord implements TaskEntity {
    completed: boolean;
    id: string;
    projectId: string;
    taskName: string;

    constructor(obj: NewTaskEntity) {
        if (!obj.taskName || obj.taskName.length > 50) {
            throw new ValidationError("Nazwa zadania nie może być pusta, ani przekraczać 50 znaków.");
        }

        this.id = obj.id;
        this.taskName = obj.taskName;
        this.projectId = obj.projectId;
        this.completed = obj.completed;
    }
}