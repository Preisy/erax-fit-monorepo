export class Response201 {
    status = 201;
    description: string;
    type: any;

    constructor(type: any, description: string) {
        this.type = type;
        this.description = description;
    }
}