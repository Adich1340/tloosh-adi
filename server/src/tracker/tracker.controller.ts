// src/user-clicks/user-clicks.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { Tracker } from './tracker.entity';

@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post('/track-action')
  async trackClick(
    @Body('userId') userId: number,
    @Body('elementId') elementId: string,
  ): Promise<Tracker> {
    return this.trackerService.trackClick(userId, elementId);
  }
}
