import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDateString, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';

export class CreateExerciseRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  public name: string;

  @IsDefined()
  @IsDateString()
  @ApiProperty()
  public date: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public comment?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public loop?: number;

  @IsDefined()
  @ApiProperty()
  public userId: number;

  @IsDefined()
  @ApiProperty()
  public exercises: ExerciseEntity[];

  constructor(
    name: string,
    date: string,
    userId: number,
    exercises: ExerciseEntity[],
    comment?: string,
    loop?: number,
  ) {
    this.name = name;
    this.date = date;
    this.userId = userId;
    this.exercises = exercises;
    this.comment = comment;
    this.loop = loop;
  }
}

export class CreateWorkoutResponse {
  @ApiProperty({ type: ExerciseEntity })
  public workout: ExerciseEntity;

  constructor(workout: ExerciseEntity) {
    this.workout = workout;
  }
}
