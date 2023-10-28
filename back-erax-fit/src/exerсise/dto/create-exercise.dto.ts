import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateExerciseRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  public name: string;

  @IsDefined()
  @ApiProperty()
  public weight: number;

  @IsDefined()
  @ApiProperty()
  public sets?: number;

  @IsDefined()
  @ApiProperty()
  public repetitions: number;

  @IsDefined()
  @ApiProperty()
  public restTime: number;

  @IsDefined()
  @ApiProperty()
  @IsString()
  public pace: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  public photoLink: string;

  @IsDefined()
  @ApiProperty()
  @IsString()
  public videoLink: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public trainerComment?: string;

  constructor(
    name: string,
    weight: number,
    sets: number,
    repetitions: number,
    restTime: number,
    pace: string,
    photoLink: string,
    videoLink: string,
    trainerComment?: string,
  ) {
    this.name = name;
    this.weight = weight;
    this.sets = sets;
    this.repetitions = repetitions;
    this.restTime = restTime;
    this.pace = pace;
    this.photoLink = photoLink;
    this.videoLink = videoLink;
    this.trainerComment = trainerComment;
  }
}
