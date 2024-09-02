import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../offers/offer.entity';
import { Affiliant } from '../affiliants/affiliant.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Affiliant)
    private readonly affiliantRepository: Repository<Affiliant>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    try {
      // const queryRunner =
      //   this.offerRepository.manager.connection.createQueryRunner();
      // await queryRunner.query('TRUNCATE TABLE "offer", "affiliant" CASCADE');
      // await queryRunner.release();

      // Create and save affiliants with unique group IDs
      const affiliants = [
        { name: 'Affiliant A', link: 'https://www.google.com' },
        { name: 'Affiliant B', link: 'https://www.google.com' },
        { name: 'Affiliant C', link: 'https://www.google.com' },
        { name: 'Affiliant D', link: 'https://www.google.com' },
      ];

      const createdAffiliants = affiliants.map((affiliant) =>
        this.affiliantRepository.create(affiliant),
      );
      await this.affiliantRepository.save(createdAffiliants);

      // Create and save offers with descriptions
      const offers = [
        {
          name: 'Optimize your savings',
          price: 50,
          description:
            "We've noticed that people with similar incomes are earning more interest on their savings. Let's explore some easy options to boost your savings rate.",
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant A'),
        },
        {
          name: 'Streamline your subscriptions',
          price: 30,
          description:
            'Many of our users have found extra cash by reviewing their subscriptions. We can help you easily spot services you might not be using frequently.',
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant A'),
        },
        {
          name: 'Unlock better credit card rewards',
          price: 40,
          description:
            "Based on your spending habits, you could be earning more rewards. We've found some cards that might be a better fit for your lifestyle.",
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant B'),
        },
        {
          name: 'Discover hidden employee benefits',
          price: 100,
          description:
            "Many people don't realize all the perks their job offers. Let's take a quick look at your benefits package - there might be some valuable options you're not using yet.",
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant C'),
        },
        {
          name: 'Effortless bill reduction',
          price: 75,
          description:
            "We've partnered with services that can negotiate lower rates on your bills. Many users save money without changing their services at all.",
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant D'),
        },
        {
          name: 'Smart grocery shopping',
          price: 60,
          description:
            "Did you know you could save on groceries without changing what you buy? We'll show you some easy tricks to reduce your food bill.",
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant A'),
        },
        {
          name: 'Energy-saving made simple',
          price: 45,
          description:
            'Many homes in your area are paying less for utilities. We have some simple tips that could lower your energy bills without any big changes.',
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant B'),
        },
        {
          name: 'Painless debt optimization',
          price: 90,
          description:
            "We've found that some of our users with similar debt are paying less interest. Let's explore if there are better options for your situation.",
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant C'),
        },
        {
          name: 'Unlock your 401(k) potential',
          price: 200,
          description:
            "Many people don't realize they're leaving free money on the table. We'll show you how to make the most of your employer's 401(k) match.",
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant D'),
        },
        {
          name: 'Explore investment options',
          price: 120,
          description:
            "You might be missing out on investment opportunities that align with your goals. Let's take a look at some tailored options.",
          affiliant: createdAffiliants.find((a) => a.name === 'Affiliant A'),
        },
      ];

      const createdOffers = offers.map((offerData) =>
        this.offerRepository.create(offerData),
      );
      await this.offerRepository.save(createdOffers);

      console.log('Seed data inserted successfully');
    } catch (error) {
      console.log('Seed service error:', error);
    }
  }
}
