import { ApiProperty } from '@nestjs/swagger';
import { CreateAntropometricsRequest } from '../../../../modules/core/antropometrics/dto/create-antropometrics.dto';
import { IsDefined, IsNumber, Min } from 'class-validator';

export class CreateAnthropometricsByAdminRequest extends CreateAntropometricsRequest {
  @ApiProperty()
  @IsDefined()
  @Min(0)
  @IsNumber()
  public userId: number;
}
