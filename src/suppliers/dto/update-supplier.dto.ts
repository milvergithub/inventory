import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from '@/suppliers/dto/create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}
