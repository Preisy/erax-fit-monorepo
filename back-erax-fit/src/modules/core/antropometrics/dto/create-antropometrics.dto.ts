import { IsDefined, IsNumber, Min, Max, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from 'src/models/app-base-entity.entity';

export class CreateAntropometricsRequest extends AppBaseEntity {
  //   @IsDefined()
  //   @IsNumber()
  //   @ApiProperty()
  //   @Min(1)
  //   public userId!: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(20)
  @Max(600)
  public weight: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(300)
  public waist: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(500)
  public abdomen: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(150)
  public shoulder: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(150)
  public hip: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(150)
  public hipVolume: number;

  @IsBoolean()
  @ApiProperty()
  public status: boolean;
}
