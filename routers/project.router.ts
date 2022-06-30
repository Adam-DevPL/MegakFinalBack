import {Router} from "express";
import {ProjectRecord} from "../records/project.record";
import {NewProjectEntity} from "../types";
import {ValidationError} from "../utlils/errors";

export const projectRouter = Router()
    .get("/", async (req, res) => {

        const projects = await ProjectRecord.getAll();
        res.json({
            projects,
        });
    })
    .post("/", async (req, res) => {
        const newProject = new ProjectRecord(req.body as NewProjectEntity);
        await newProject.insert();

        res.json(newProject);
    })
    .delete("/:id", async (req, res) => {
        const project = await ProjectRecord.getOne(req.params.id);

        if (!project) {
            throw new ValidationError("No such project.")
        }

        await project.delete();

        res.end();
    })
