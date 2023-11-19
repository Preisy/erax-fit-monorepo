import { OmitType } from '@nestjs/swagger';
import { CreateUserRequest } from '../../../core/user/dto/create-user.dto';

export class CreateUserByClientRequest extends OmitType(CreateUserRequest, ['stepsGoal']) {}
