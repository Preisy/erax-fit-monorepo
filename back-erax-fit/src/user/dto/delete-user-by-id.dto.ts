import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserByIdResponse {
  @ApiProperty()
  public status: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}
