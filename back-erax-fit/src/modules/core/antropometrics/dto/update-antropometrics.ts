import { PartialType } from '@nestjs/swagger';
import { CreateAntropometricsRequest } from './create-antropometrics.dto';

export class UpdateAntropometricsRequest extends PartialType(CreateAntropometricsRequest) {}
