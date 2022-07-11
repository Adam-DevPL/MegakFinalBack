import express, {json, Router} from "express";
import cors from "cors";
import 'express-async-errors';
import {handleError} from "./utlils/errors";
import rateLimit from 'express-rate-limit';
import {projectRouter} from "./routers/project.router";
import {taskRouter} from "./routers/task.router";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}));

const router = Router();

router.use("/project", projectRouter);
router.use("/task", taskRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});