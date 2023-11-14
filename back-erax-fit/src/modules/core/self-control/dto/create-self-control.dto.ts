import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, Min } from 'class-validator';

export class CreateSelfControlRequest {
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public userId: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public templateId: number;
}
