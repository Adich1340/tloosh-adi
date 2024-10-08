import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { OffersService } from './offers.service';
import { Offer } from './offer.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get('/get-offers/:userId')
  async getAllOffers(@Param('userId') userId: number): Promise<Offer[]> {
    return this.offersService.getAllOffers(userId);
  }

  @Post('hide-offer')
  async hideOffer(
    @Body('userId') userId: number,
    @Body('offerId') offerId: number,
  ): Promise<boolean> {
    return this.offersService.hideOffer(userId, offerId);
  }

  @Post('hide-affiliant')
  async hideAffiliant(
    @Body('userId') userId: number,
    @Body('affiliantId') affiliantId: number,
  ): Promise<boolean> {
    return this.offersService.hideAffiliant(userId, affiliantId);
  }
}
