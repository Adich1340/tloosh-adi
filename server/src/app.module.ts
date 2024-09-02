import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliantsModule } from './affiliants/affiliant.module';
import { UserActionsModule } from './user-actions/user-actions.module';
import { OffersModule } from './offers/offers.module';
import { SeedModule } from './seed/seed.module'; // Import SeedModule
import { Affiliant } from './affiliants/affiliant.entity';
import { Offer } from './offers/offer.entity';
import { UserAction } from './user-actions/user-action.entity';
import { TrackerModule } from './tracker/tracker.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mzv3rm',
      password: 'tloosh',
      database: 'tloosh',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
        Affiliant,
        Offer,
        UserAction,
      ],
      synchronize: true,
      dropSchema: true,
    }),
    AffiliantsModule,
    UserActionsModule,
    OffersModule,
    TrackerModule,
    SeedModule,
  ],
})
export class AppModule {}
