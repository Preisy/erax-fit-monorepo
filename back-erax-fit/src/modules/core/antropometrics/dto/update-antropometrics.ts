import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAntropometricsRequest {
  public id: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public weight?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public waist?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public abdomen?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public shoulder?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public hip?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public hipVolume?: number;
}
