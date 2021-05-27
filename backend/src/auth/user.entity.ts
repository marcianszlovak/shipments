import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shipment } from '../shipment/shipment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Shipment, (task) => task.user, { eager: true })
  shipments: Shipment[];
}
