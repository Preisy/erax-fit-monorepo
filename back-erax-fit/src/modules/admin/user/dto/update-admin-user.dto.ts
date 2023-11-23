import { UpdateUserRequest } from '../../../core/user/dto/update-user.dto';
import { Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserByAdminRequest extends UpdateUserRequest {
  @IsNumber()
  @Min(1)
  @Max(14)
  @ApiProperty()
  public taskPeriod: number;
}
