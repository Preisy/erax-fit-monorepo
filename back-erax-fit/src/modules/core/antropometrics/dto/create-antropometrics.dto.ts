import { IsDefined, IsNumber, Min, Max, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAntropometricsRequest {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(20)
  @Max(600)
  public weight: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(30)
  @Max(300)
  public waist: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(30)
  @Max(500)
  public abdomen: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(30)
  @Max(150)
  public shoulder: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(30)
  @Max(150)
  public hip: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(30)
  @Max(150)
  public hipVolume: number;

  @IsBoolean()
  @ApiProperty()
  public status: boolean;
}
