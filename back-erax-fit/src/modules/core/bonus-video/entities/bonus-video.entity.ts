import { Entity } from 'typeorm';
import { FileEntity } from '../../file/entity/file.entity';

@Entity('video')
export class BonusVideoEntity extends FileEntity {}
