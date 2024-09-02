import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Affiliant } from './affiliant.entity';

@Injectable()
export class AffiliantsService {
  constructor(
    @InjectRepository(Affiliant)
    private readonly affiliantRepository: Repository<Affiliant>,
  ) {}

  async createAffiliant(name: string): Promise<Affiliant> {
    const affiliant = this.affiliantRepository.create({ name });
    return this.affiliantRepository.save(affiliant);
  }

  async findAll(): Promise<Affiliant[]> {
    return this.affiliantRepository.find({ relations: ['offers'] });
  }

  async findById(id: number): Promise<Affiliant> {
    return this.affiliantRepository.findOne({ where: { id }, relations: ['offers'] });
  }
}
