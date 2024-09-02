import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Offer } from 'src/offers/offer.entity';
import { UserAction } from 'src/user-actions/user-action.entity';

// @Entity({ schema: 'tloosh', name: 'affiliant' })
@Entity()
export class Affiliant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;  // Link to the affiliant's page

  @OneToMany(() => Offer, (offer) => offer.affiliant)
  offers: Offer[];

  @OneToMany(() => UserAction, (userAction) => userAction.affiliant)
  userActions: UserAction[];
}
