import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAction } from './user-action.entity';
import { UserActionsService } from './user-actions.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([UserAction])],
  providers: [UserActionsService],
  exports: [TypeOrmModule, UserActionsService],
})
export class UserActionsModule {}
