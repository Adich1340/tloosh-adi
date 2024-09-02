import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersService } from './offers.service';
import { Offer } from './offer.entity';
import { UserAction } from '../user-actions/user-action.entity';
import { Affiliant } from '../affiliants/affiliant.entity';
import { AffiliantsModule } from 'src/affiliants/affiliant.module';
  import { OffersController } from './offers.controller';
import { UserActionsService } from 'src/user-actions/user-actions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer, UserAction, Affiliant]),
    AffiliantsModule, // Ensure AffiliantsModule is imported
  ],
  providers: [OffersService, UserActionsService],
  exports: [OffersService],
  controllers: [OffersController], // Add OffersController here
})
export class OffersModule {}
