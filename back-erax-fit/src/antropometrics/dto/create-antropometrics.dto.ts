import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsDate, IsNumber } from 'class-validator';

export class CreateAntropometricsRequest {
  @IsDefined()
  @IsDate()
  @ApiProperty()
  public date: Date;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public weight: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public waist: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public abdomen: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public shoulder: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public hip: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  public hipVolume: number;
}
