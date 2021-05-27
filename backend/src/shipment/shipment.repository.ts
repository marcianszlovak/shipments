import { EntityRepository, Repository } from 'typeorm';
import { Shipment } from './shipment.entity';
import { GetShipmentFilterDto } from './dto/get-shipment-filter.dto';
import { User } from '../auth/user.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Shipment)
export class ShipmentRepository extends Repository<Shipment> {
  async getShipments(
    filterDto: GetShipmentFilterDto,
    user: User,
  ): Promise<Array<Shipment>> {
    const { status } = filterDto;

    const query = this.createQueryBuilder('shipment');
    query.where({ user });

    if (status) {
      query.andWhere('shipment.status = :status', { status });
    }

    try {
      return await query.getMany();
    } catch (e) {
      console.log(e.message);

      throw new InternalServerErrorException();
    }
  }
}
