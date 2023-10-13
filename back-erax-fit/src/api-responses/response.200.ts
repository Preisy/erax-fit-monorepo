export class Response200 {
    status = 200;
    description = 'OK';
    type: any;

    constructor(type: any) {
        this.type = type;
    }
}