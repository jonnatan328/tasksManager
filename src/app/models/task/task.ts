import { project } from "../project/project";
/**
 * Modelo con la informacion correspondiente a una tarea
 */
export class Task {
    constructor(
        public name: string,
        public project: project,
        public deadline: string,
        public comment: string
    ){}
}