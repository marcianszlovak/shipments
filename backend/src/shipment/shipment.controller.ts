import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { GetShipmentFilterDto } from './dto/get-shipment-filter.dto';
import { User } from '../auth/user.entity';
import { Shipment } from './shipment.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('shipment')
@UseGuards(AuthGuard())
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Get()
  public getShipments(
    @Query() filterDto: GetShipmentFilterDto,
    user: User,
  ): Promise<Array<Shipment>> {
    return this.shipmentService.getShipments(filterDto, user);
  }

  @Get('/:id')
  public getShipmentById(
    @Param('id') id: string,
    user: User,
  ): Promise<Shipment> {
    return this.shipmentService.getShipmentById(id, user);
  }
}
