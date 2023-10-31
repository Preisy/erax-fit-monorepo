import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { Repository } from 'typeorm';
import { BasePromptService } from './base-prompt.service';
import { PromptEntity } from './entity/prompt.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PromptEntity]), forwardRef(() => AuthModule)],
  exports: [BasePromptService],
  providers: [BasePromptService, Repository],
})
export class BasePromptModule {}
