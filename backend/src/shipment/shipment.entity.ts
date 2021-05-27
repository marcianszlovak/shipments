import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShipmentStatus } from './shipment-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  trackingNumber: string;

  @Column()
  date: string;

  @Column()
  status: ShipmentStatus;

  @ManyToOne(() => User, (user) => user.shipments, { eager: false })
  user: User;
}
