import {FieldPacket} from "mysql2";

export interface ProjectEntity {
    id: string;
    projectName: string;
    createdAt: Date | undefined;
}

export interface NewProjectEntity extends Omit<ProjectEntity, "id" | "createdAt"> {
    id?: string;
    createdAt?: Date | undefined;
}

export type ProjectRecordResults = [ProjectEntity[], FieldPacket[]];