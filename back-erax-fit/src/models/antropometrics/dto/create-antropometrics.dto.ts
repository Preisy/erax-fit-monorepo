import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsDate, IsNumber } from 'class-validator';
import { AntropometricsEntity } from '../entities/antropometrics.entity';

export class CreateAntropometricsRequest extends AntropometricsEntity {}

export class CreateAntropometricsByAdminRequest extends CreateAntropometricsRequest {}
