import { OmitType } from '@nestjs/swagger';
import { UpdateUserRequest } from '../../../core/user/dto/update-user.dto';

export class UpdateUserByClientRequest extends OmitType(UpdateUserRequest, ['stepsGoal']) {}
