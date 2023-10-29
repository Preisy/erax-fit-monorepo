import { Module, forwardRef } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    forwardRef(() => AuthModule),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
