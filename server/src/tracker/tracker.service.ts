// src/user-clicks/user-clicks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tracker } from './tracker.entity';

@Injectable()
export class TrackerService {
  constructor(
    @InjectRepository(Tracker)
    private readonly trackerRepository: Repository<Tracker>,
  ) {}

  async trackClick(userId: number, elementId: string): Promise<Tracker> {
    let clickRecord = await this.trackerRepository.findOne({ where: { userId, elementId } });

    if (clickRecord) {
      // If the record exists, increment the click count
      clickRecord.clickCount += 1;
      clickRecord.updatedAt = new Date();
    } else {
      // If no record exists, create a new one
      clickRecord = this.trackerRepository.create({ userId, elementId, clickCount: 1 });
    }

    return this.trackerRepository.save(clickRecord);
  }
}
