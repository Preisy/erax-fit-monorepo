import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsIn, ValidateIf } from 'class-validator';
import { AntropometricsEntity } from '../entities/antropometrics.entity';
import { Constants, UserRole } from '../../../constants/constants';

export class CreateAntropometricsRequest extends AntropometricsEntity {}

export class CreateAntropometricsByAdminRequest extends CreateAntropometricsRequest {
  @IsDefined()
  @IsIn(Constants.UserRoleList.getList())
  @ApiProperty({
    example: `One value from [${Constants.UserRoleList.getList()}]`,
  })
  public role: UserRole;

  @ApiProperty({ description: 'If the type is user, you need to provide a user to attach to' })
  @ValidateIf((o) => o.role === UserRole.Admin)
  @IsDefined()
  @IsNumber()
  public userId: number;
}
