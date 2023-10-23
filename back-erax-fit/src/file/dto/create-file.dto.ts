import { ConfigService } from '@nestjs/config';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileResponse {
  @ApiProperty()
  public link: string;

  constructor(fileName: string) {
    const configService = new ConfigService();
    this.link = configService.get('APP_BASE_URL') + '/' + fileName;
  }
}
