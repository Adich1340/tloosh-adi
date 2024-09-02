// src/user-clicks/user-clicks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackerController } from './tracker.controller';
import { Tracker } from './tracker.entity';
import { TrackerService } from './tracker.service';


@Module({
  imports: [TypeOrmModule.forFeature([Tracker])],
  controllers: [TrackerController],
  providers: [TrackerService],
})
export class TrackerModule {}
