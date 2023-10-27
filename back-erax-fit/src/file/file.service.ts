import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { CreateFileResponse } from './dto/create-file.dto';
import { MainException } from 'src/exceptions/main.exception';
import { GetFileResponse } from './dto/get-file.dto';
import { GetFilesRequest, GetFilesResponse } from './dto/get-files.dto';

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

  async getFiles(request: GetFilesRequest): Promise<GetFilesResponse> {
    const page = request.page || 1;
    const limit = request.limit;
    const skip = (page - 1) * limit || 0;
    const [files, count] = await this.fileRepository.findAndCount({
      skip: skip,
      take: limit,
    });

    return new GetFilesResponse(files, count);
  }
}
