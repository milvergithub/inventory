import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierQueryDto } from './dto/supplier-query.dto';

@Controller('api/v1/suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  findAll(@Query() query: SupplierQueryDto) {
    return this.supplierService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.supplierService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSupplierDto) {
    return this.supplierService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSupplierDto) {
    return this.supplierService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.supplierService.remove(id);
  }
}
