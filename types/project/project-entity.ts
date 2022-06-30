import {FieldPacket} from "mysql2";

export interface ProjectEntity {
    id: string;
    projectName: string;
}

export interface NewProjectEntity extends Omit<ProjectEntity, "id"> {
    id?: string;
}

export type ProjectRecordResults = [ProjectEntity[], FieldPacket[]];