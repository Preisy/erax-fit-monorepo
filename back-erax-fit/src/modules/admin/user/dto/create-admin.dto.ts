import { CreateUserRequest } from '../../../core/user/dto/create-user.dto';
import { IsDefined, IsIn, IsNumber, Min } from 'class-validator';
import { Constants, UserRole } from '../../../../constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserByAdminRequest extends CreateUserRequest {
  @IsDefined()
  @IsIn(Constants.UserRoleList.getList())
  @ApiProperty({
    example: `One value from [${Constants.UserRoleList.getList()}]`,
  })
  public role: UserRole;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  public stepsGoal: number;
}
