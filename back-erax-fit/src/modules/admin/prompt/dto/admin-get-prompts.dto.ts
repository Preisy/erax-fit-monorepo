import { ApiProperty } from '@nestjs/swagger';

export class GetPromptsRequest {
  @ApiProperty()
  public type: string;
}
