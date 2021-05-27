import { Inject } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { UserRepository } from '../auth/user.repository';
import fs from 'fs';
import csvParser from 'csv-parser';
import { ShipmentService } from '../shipment/shipment.service';
import { ShipmentRepository } from '../shipment/shipment.repository';

@Console()
export class SeedService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    @Inject(ShipmentService) private shipmentRepository: ShipmentRepository,
  ) {}

  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    await this.seedUsers();
  }

  async seedUsers() {
    await this.userRepository.create({
      id: 1,
      email: 'test1@test.com',
      password: 'test1',
    });
    await this.userRepository.create({
      id: 2,
      email: 'test2@test.com',
      password: 'test2',
    });
  }

  async seedShipments() {
    const results = [];
    fs.createReadStream('shipments.csv')
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        results.forEach((s) => {
          this.shipmentRepository.create({
            id: s[0],
            trackingNumber: s[1],
            status: s[2],
            date: s[3],
            user: s[4],
          });
        });
      });
  }
}
