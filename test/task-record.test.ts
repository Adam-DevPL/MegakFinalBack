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