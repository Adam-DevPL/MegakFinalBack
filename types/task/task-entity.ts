import {FieldPacket} from "mysql2";

export interface TaskEntity {
    id: string;
    taskName: string;
    completed: boolean;
    projectId: string;
    createdAt: Date | undefined;
}

export interface NewTaskEntity extends Omit<TaskEntity, "id" | "createdAt"> {
    id?: string;
    createdAt?: Date | undefined;
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