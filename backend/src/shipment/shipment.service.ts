import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentRepository } from './shipment.repository';
import { GetShipmentFilterDto } from './dto/get-shipment-filter.dto';
import { User } from '../auth/user.entity';
import { Shipment } from './shipment.entity';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(ShipmentRepository)
    private shipmentRepository: ShipmentRepository,
  ) {}

  public getShipments(
    filterDto: GetShipmentFilterDto,
    user: User,
  ): Promise<Array<Shipment>> {
    return this.shipmentRepository.getShipments(filterDto, user);
  }

  public async getShipmentById(id: string, user: User): Promise<Shipment> {
    const found = await this.shipmentRepository.findOne({
      where: { id, user },
    });

    if (!found) {
      throw new NotFoundException(`Shipment with ID "${id}" not found`);
    }

    return found;
  }
}
