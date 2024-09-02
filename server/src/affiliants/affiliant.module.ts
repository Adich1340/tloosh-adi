import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affiliant } from './affiliant.entity';
import { AffiliantsService } from './affiliants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Affiliant])],
  providers: [AffiliantsService],
  exports: [TypeOrmModule, AffiliantsService],
})
export class AffiliantsModule {}
