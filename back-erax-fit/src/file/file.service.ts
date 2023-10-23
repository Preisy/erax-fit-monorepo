import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { CreateFileResponse } from './dto/create-file.dto';
import { MainException } from 'src/exceptions/main.exception';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {
    console.log();
  }

  async createFile(file: Express.Multer.File): Promise<CreateFileResponse> {
    const newFile = this.fileRepository.create({
      fileName: file.filename,
      path: file.filename,
    });

    const savedFile = await this.fileRepository.save(newFile);
    if (!savedFile) throw MainException.internalRequestError('Error upon saving file');

    return new CreateFileResponse(file.filename);
  }
}
