import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from '@/warehouse/dto/create-warehouse.dto';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {}
