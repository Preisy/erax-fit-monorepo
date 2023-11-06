import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsString, Length, ValidateNested } from 'class-validator';
import { CreateMealItemRequest } from '../../meal-item/dto/create-meal-item.dto';

export class CreateMealRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public name: string;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateMealItemRequest)
  @ApiProperty({ type: [CreateMealItemRequest] })
  public mealItems: CreateMealItemRequest[];
}
