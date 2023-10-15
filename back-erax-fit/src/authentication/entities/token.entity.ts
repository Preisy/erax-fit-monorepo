import { ApiProperty } from "@nestjs/swagger";
import {
    Column,
    Entity,
    OneToOne,
  } from 'typeorm';
import { UserEntity } from "src/user/entities/user.entity";

@Entity('tokens')
export class TokenEntity{
  @ApiProperty()
  @Column({ name: 'hash', type: 'varchar', length: 256, nullable: true})
  public hash: string;

  @ApiProperty()
  @Column({ name: 'refresh_hash', type: 'varchar', length: 256, nullable: true})
  public refreshHash: string;

  @OneToOne(() => UserEntity, (user) => user.token)
  user: UserEntity;
}