import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsDefined, IsString, Length } from 'class-validator';

export class UpdateCronJobRequest {
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public id: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(14)
  public taskPeriod: number;

  @IsDefined()
  @IsString()
  @Length(1, 50)
  @ApiProperty()
  public taskName: string;
}
