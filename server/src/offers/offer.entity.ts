import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { UserAction } from 'src/user-actions/user-action.entity';
import { Affiliant } from 'src/affiliants/affiliant.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => Affiliant, (affiliant) => affiliant.offers, { onDelete: 'CASCADE' })
  affiliant: Affiliant;

  @OneToMany(() => UserAction, (userAction) => userAction.offer)
  userActions: UserAction[];
}
