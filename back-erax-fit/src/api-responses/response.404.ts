import { MainException } from "src/exceptions/main.exception";

export class Response404 {
    status = 404;
    description = 'Not Found';
    type: MainException;
}