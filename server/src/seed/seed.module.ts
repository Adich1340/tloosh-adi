import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Offer } from '../offers/offer.entity';
import { Affiliant } from '../affiliants/affiliant.entity';
import { UserAction } from '../user-actions/user-action.entity';
import { OffersModule } from '../offers/offers.module';
import { AffiliantsModule } from '../affiliants/affiliant.module'; 
import { UserActionsModule } from '../user-actions/user-actions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer, Affiliant, UserAction]),
    OffersModule,
    AffiliantsModule,
    UserActionsModule,
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
