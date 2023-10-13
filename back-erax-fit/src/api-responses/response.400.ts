import { MainException } from "src/exceptions/main.exception";

export class Response400 {
    status = 400;
    description = 'Bad Request';
    type: MainException;
}