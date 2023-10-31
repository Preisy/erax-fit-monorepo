import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateWorkoutRequest } from './create-workout.dto';

export class UpdateWorkoutRequest extends PartialType(OmitType(CreateWorkoutRequest, ['userId'])) {}
