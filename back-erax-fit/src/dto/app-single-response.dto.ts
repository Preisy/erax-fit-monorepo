import { ApiProperty } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';

export class AppSingleResponse<Entity extends ObjectLiteral> {
  constructor(public data: Entity) {
    this.data = data;
  }

  static type<T extends ObjectLiteral>(type: new (...args: unknown[]) => T) {
    class AppSingleResponseType extends AppSingleResponse<T> {
      @ApiProperty({ type })
      public data: T;
    }
    return AppSingleResponseType;
  }
}
