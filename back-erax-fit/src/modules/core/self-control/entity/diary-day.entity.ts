// import { ApiProperty } from '@nestjs/swagger';
// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
// import { UserEntity } from '../../user/entities/user.entity';
// import { SelfControlProperties } from '../../diary-template/entity/diary-template.entity';

// @Entity('diary-days')
// export class DiaryDayEntity extends AppBaseEntity {
//   @ApiProperty()
//   @Column()
//   public behavior: string;

//   @ApiProperty()
//   @Column()
//   public date: Date;

//   @ApiProperty()
//   @Column()
//   public sum: number;

//   @ApiProperty()
//   @Column()
//   public activity: string;

//   @ApiProperty()
//   @Column()
//   public steps: number;

//   @ApiProperty({ type: () => UserEntity })
//   @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'userId' })
//   public user!: UserEntity;

//   @ApiProperty()
//   @Column('integer', { name: 'userId' })
//   public userId!: number;

//   @ApiProperty()
//   @Column()
//   public selfControl: ;
// }
