import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { WarehouseService } from '@/warehouse/warehouse.service';
import { CreateWarehouseDto } from '@/warehouse/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '@/warehouse/dto/update-warehouse.dto';
import { WarehouseQueryDto } from '@/warehouse/dto/warehouse-query.dto';

@Controller('api/v1/warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  findAll(@Query() request: WarehouseQueryDto) {
    return this.warehouseService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseService.findOne(id);
  }

  @Post()
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseService.remove(id);
  }
}
