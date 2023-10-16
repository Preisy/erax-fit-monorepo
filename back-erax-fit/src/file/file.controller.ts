import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
    constructor(private readonly filesService: FileService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadeFile(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.createFile(file);
    }
}
