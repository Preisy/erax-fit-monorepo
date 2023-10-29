import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';

export class GetMeResponse {
  @ApiProperty({ type: UserEntity })
  public me: UserEntity;

  constructor(user: UserEntity) {
    this.me = user;
  }
}
