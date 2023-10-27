import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../entities/file.entity';

export class GetFileResponse {
  @ApiProperty({ type: FileEntity })
  public file: FileEntity;

  constructor(file: FileEntity) {
    this.file = file;
  }
}
