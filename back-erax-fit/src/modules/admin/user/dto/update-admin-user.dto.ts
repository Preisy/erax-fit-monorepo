import { UpdateUserRequest } from '../../../core/user/dto/update-user.dto';
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserByAdminRequest extends UpdateUserRequest {
  @IsBoolean()
  @ApiProperty()
  public canWatchVideo: boolean;
}
