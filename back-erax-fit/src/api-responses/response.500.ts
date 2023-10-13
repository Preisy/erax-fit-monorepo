import { MainException } from "src/exceptions/main.exception";

export class Response500 {
    status = 500;
    description = 'Internal Server Error';
    type: MainException;
}