import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, In, Not } from 'typeorm';
import { Offer } from './offer.entity';
import { UserAction } from 'src/user-actions/user-action.entity';
import { Affiliant } from 'src/affiliants/affiliant.entity';

@Injectable()
export class OffersService {
  private cache: Map<
    number,
    { hiddenOfferIds: number[]; hiddenAffiliantGroupIds: number[] }
  > = new Map();

  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    @InjectRepository(UserAction)
    private readonly userActionsRepository: Repository<UserAction>,
    @InjectRepository(Affiliant)
    private readonly affiliantsRepository: Repository<Affiliant>,
  ) {}

  async getAllOffers(userId: number): Promise<Offer[]> {
    try {
      let hiddenOfferIds: number[] = [];
      let hiddenAffiliantGroupIds: number[] = [];

      // Retrieve all user actions for hidden offers
      const hiddenOffers = await this.userActionsRepository.find({
        where: { userId, actionType: 'hide_offer' },
        relations: ['offer', 'affiliant'],
      });

      // Retrieve all user actions for hidden affiliants
      const hiddenAffiliants = await this.userActionsRepository.find({
        where: { userId, actionType: 'hide_affiliant' },
        relations: ['affiliant'],
      });

      // Extract offer IDs and affiliant group IDs that the user has hidden
      hiddenOfferIds = hiddenOffers.map((ua) => ua.offer.id);
      hiddenAffiliantGroupIds = hiddenAffiliants
        .map((ua) => ua.affiliant.id)
        .filter((id) => id !== null) as number[];

      // Fetch all offers that are not hidden by the user, including affiliant data
      const offers = await this.offersRepository.find({
        where: {
          ...(hiddenOfferIds.length > 0 && { id: Not(In(hiddenOfferIds)) }),
        },
        relations: ['affiliant'],
      });

      // Filter out offers with hidden affiliant groups
      const filteredOffers = offers.filter(
        (offer) => !hiddenAffiliantGroupIds.includes(offer.affiliant.id),
      );

      return filteredOffers;
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  }

  async hideOffer(userId: number, offerId: number) {
    try {
      const offer = await this.offersRepository.findOne({
        where: { id: offerId },
      });

      if (offer) {
        await this.userActionsRepository.save({
          userId,
          actionType: 'hide_offer',
          offer,
        });
      }
      return true;
    } catch (e) {
      console.error('hide offer error: ', e);
      return false;
    }
  }

  async hideAffiliant(userId: number, affiliantId: number) {
    try {
      const affiliant = await this.affiliantsRepository.findOne({
        where: { id: affiliantId },
      });

      if (affiliant) {
        await this.userActionsRepository.save({
          userId,
          actionType: 'hide_affiliant',
          affiliant,
        });
      }
      return true;
    } catch (e) {
      console.error('hide affiliant error: ', e);
      return false;
    }
  }
}
