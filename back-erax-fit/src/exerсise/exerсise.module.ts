import { Module } from '@nestjs/common';
import { ExerсiseService } from './exerсise.service';
import { ExerсiseController } from './exerсise.controller';

@Module({
  providers: [ExerсiseService],
  controllers: [ExerсiseController]
})
export class ExerсiseModule {}
