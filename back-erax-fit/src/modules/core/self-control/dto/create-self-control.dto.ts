import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsNumber, IsOptional, IsString, Length, Min, ValidateNested } from 'class-validator';
import { CreateSelfControlPropsRequest } from '../../self-control-props/dto/create-self-control-props.dto';

export class CreateSelfControlRequest {
  @IsDefined()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public userId: number;

  @IsDefined()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public templateId: number;
}
