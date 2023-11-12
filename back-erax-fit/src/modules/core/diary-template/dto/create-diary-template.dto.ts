import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsNumber, Min, ValidateNested } from 'class-validator';
import { CreateSelfControlPropsRequest } from '../../self-control-props/dto/create-self-control-props.dto';

export class CreateDiaryTemplateRequest {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  public stepsGoal: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public userId: number;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSelfControlPropsRequest)
  @ApiProperty({ type: [CreateSelfControlPropsRequest] })
  public props: CreateSelfControlPropsRequest[];
}
