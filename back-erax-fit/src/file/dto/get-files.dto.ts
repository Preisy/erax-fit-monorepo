import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumberString, IsOptional } from 'class-validator';
import { FileEntity } from '../entities/file.entity';

export class GetFilesRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  public expanded?: boolean;

  constructor(expanded = false, page?: number, limit?: number) {
    this.page = page;
    this.limit = limit;
    this.expanded = expanded;
  }
}

export class GetFilesResponse {
  @ApiProperty({ type: [FileEntity] })
  public files: FileEntity[];

  @ApiProperty()
  public count: number;

  constructor(files: FileEntity[], count: number) {
    this.files = files;
    this.count = count;
  }
}
