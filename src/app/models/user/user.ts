/**
 * Modelo que representa la información del usuario
 */
export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public password: string
    ){}
}