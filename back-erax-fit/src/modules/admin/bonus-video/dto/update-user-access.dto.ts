import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdateAccessToVideoForUserRequest {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  public userId: number;

  @ApiProperty()
  @IsBoolean()
  public canWatch: boolean;
}
