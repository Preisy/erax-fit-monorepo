import { UpdateUserRequest } from '../../../core/user/dto/update-user.dto';
import { IsString, Length, Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserByAdminRequest extends UpdateUserRequest {
  @IsString()
  @Length(1, 50)
  @ApiProperty()
  public taskName: string;

  @IsNumber()
  @Min(1)
  @Max(14)
  @ApiProperty()
  public taskPeriod: number;
}
