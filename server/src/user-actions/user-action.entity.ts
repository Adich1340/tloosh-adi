import { Affiliant } from 'src/affiliants/affiliant.entity';
import { Offer } from 'src/offers/offer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class UserAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  actionType: string; // "hide_offer" or "hide_affiliant"

  @ManyToOne(() => Offer, (offer) => offer.userActions, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'offerId' }) // Ensures the column name in the table is 'offerId'
  offer: Offer;

  @ManyToOne(() => Affiliant, (affiliant) => affiliant.userActions, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'affiliantId' }) // Ensures the column name in the table is 'affiliantId'
  affiliant: Affiliant;
}
