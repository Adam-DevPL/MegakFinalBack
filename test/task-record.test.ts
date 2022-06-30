import {TaskRecord} from "../records/task.record";

describe("Testing TaskRecord", () => {
    it('can build TaskRecord', () => {
        const task = new TaskRecord({
            taskName: 'Projekcik',
            completed: false,
            projectId: "uuid",
        })

        expect(task.taskName).toBe('Projekcik');
        expect(task.completed).toBe(false);
    });

    it("Validate invalid task name", () => {
        expect(() => new TaskRecord({
            taskName: "aaaaaaaaaaddsjdfhdsjhfjsdhfjkshfjdsfsdfsdfsfsdfsksdh",
            completed: false,
            projectId: "uuid",
        })).toThrow('Nazwa zadania nie może być pusta, ani przekraczać 50 znaków.');
    })
})

describe("Testing getting data from database for TaskRecord", () => {
    it("it should return one entry from database", async () => {
        const task = await TaskRecord.getOne("2cc0dc10-f88a-11ec-ab9c-3aaeb891aeb3");

        // console.log(task);
        expect(task).toBeDefined();
        expect(task.id).toBe("2cc0dc10-f88a-11ec-ab9c-3aaeb891aeb3");
        expect(task.taskName).toBe("Nagrac video");
        expect(task.completed).toBe(0);
        expect(task.projectId).toBe("4bc3beb4-f887-11ec-ab9c-3aaeb891aeb3");
    })

    it("it should return null when entry not found", async () => {
        const task = await TaskRecord.getOne("-");

        expect(task).toBeNull();
    })
})