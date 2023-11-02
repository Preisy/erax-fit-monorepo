import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class GetAntropometricsRequest {
  @IsDate()
  @ApiProperty()
  public startDate: Date;

  @IsDate()
  @ApiProperty()
  public endDate: Date;
}
