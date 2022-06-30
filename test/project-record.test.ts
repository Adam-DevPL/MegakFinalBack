import {ProjectRecord} from "../records/project.record";

describe("Testing ProjectRecord", () => {
    it('can build ProjectRecord', () => {
        const project = new ProjectRecord({
            projectName: 'Projekcik',
        })

        expect(project.projectName).toBe('Projekcik');
    });

    it("Validate invalid project name", () => {
        expect(() => new ProjectRecord({
            projectName: "aaaaaaaaaaddsjdfhdsjhfjsdhfjkshfjksdh",
        })).toThrow('Nazwa projektu nie może być pusta, ani przekraczać 30 znaków.');
    })
})

describe("testing getting data from database", () => {
    it("should return one entry from the database", async () => {
        const project = await ProjectRecord.getOne("4bc39ace-f887-11ec-ab9c-3aaeb891aeb3");

        expect(project).toBeDefined();
        expect(project.id).toBe("4bc39ace-f887-11ec-ab9c-3aaeb891aeb3");
        expect(project.projectName).toBe("Youtube");
    })
    it("should return null from database for non existing entry", async () => {
        const project = await ProjectRecord.getOne("----");

        expect(project).toBeNull();
    })
})