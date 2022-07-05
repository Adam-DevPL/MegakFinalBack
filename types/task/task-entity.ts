import {FieldPacket} from "mysql2";

export interface TaskEntity {
    id: string;
    taskName: string;
    completed: boolean;
    projectId: string;
}

export interface NewTaskEntity extends Omit<TaskEntity, "id"> {
    id?: string;
}


export interface SetProjectForTaskReq {
    projectId: string;
}

export interface SetTaskNameReq {
    taskName: string;
}

export interface SetCompletedForTask {
    completed: boolean;
}

export type TaskRecordResults = [TaskEntity[], FieldPacket[]];