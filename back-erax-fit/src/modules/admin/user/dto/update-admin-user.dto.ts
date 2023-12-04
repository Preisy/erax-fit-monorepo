import { UpdateUserRequest } from '../../../core/user/dto/update-user.dto';
import { IsBoolean, Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserByAdminRequest extends UpdateUserRequest {
  @IsBoolean()
  @ApiProperty()
  public canWatchVideo: boolean;

  @IsNumber()
  @Min(1)
  @Max(14)
  @ApiProperty()
  public anthrpJobPeriod: number;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  public stepsGoal: number;
}
