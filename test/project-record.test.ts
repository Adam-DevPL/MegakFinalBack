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