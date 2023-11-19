import { UpdateUserRequest } from '../../../core/user/dto/update-user.dto';
import { IsBoolean, IsString, Length, Min, Max, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserByAdminRequest extends UpdateUserRequest {
  @IsBoolean()
  @ApiProperty()
  public canWatchVideo: boolean;

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
