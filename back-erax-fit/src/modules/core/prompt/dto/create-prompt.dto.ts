import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, Length } from 'class-validator';
import { FileExists } from 'src/decorators/file-exist.decorator';
import { IsPhoto } from 'src/decorators/photo-type.decorator';
import { IsVideo } from 'src/decorators/video-type.decorator.dto';

export class CreatePromptRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public type: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  @IsPhoto()
  // @FileExists()
  public photoLink: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  @IsVideo()
  // @FileExists()
  public videoLink: string;
}
