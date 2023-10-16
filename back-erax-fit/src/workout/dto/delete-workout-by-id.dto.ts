import { ApiProperty } from '@nestjs/swagger';

export class DeleteWorkoutByIdResponse {
  @ApiProperty()
  public status: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}
