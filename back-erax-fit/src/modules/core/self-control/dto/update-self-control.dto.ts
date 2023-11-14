import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsDefined, IsNumber, IsString, Length, Min, ValidateNested } from 'class-validator';
import { UpdateSelfControlPropsRequest } from '../../self-control-props/dto/update-self-control-props.dto';

export class UpdateSelfControlRequest {
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateSelfControlPropsRequest)
  @ApiProperty({ type: [UpdateSelfControlPropsRequest] })
  public props: UpdateSelfControlPropsRequest[];

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  public steps: number;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public activity: string;
}
