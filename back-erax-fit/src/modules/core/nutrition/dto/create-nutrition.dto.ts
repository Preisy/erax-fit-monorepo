import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsNumber, Min, ValidateNested } from 'class-validator';
import { CreateMealRequest } from '../../meal/dto/create-meal.dto';

export class CreateNutritionRequest {
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public userId: number;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateMealRequest)
  @ApiProperty({ type: [CreateMealRequest] })
  public meals: CreateMealRequest[];
}
