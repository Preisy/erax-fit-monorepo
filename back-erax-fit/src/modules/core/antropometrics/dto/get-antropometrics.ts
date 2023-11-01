import { IsDate } from 'class-validator';

export class GetAntropometricsRequest {
  @IsDate()
  public startDate: Date;

  @IsDate()
  public endDate: Date;
}
