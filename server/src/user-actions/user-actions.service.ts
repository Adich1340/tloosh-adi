import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAction } from './user-action.entity';

@Injectable()
export class UserActionsService {
  constructor(
    @InjectRepository(UserAction)
    private readonly userActionRepository: Repository<UserAction>,
  ) {}
}
