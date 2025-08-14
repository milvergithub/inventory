import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { InventoryBalanceService } from './inventory-balance.service';
import { CreateInventoryBalanceDto } from './dto/create-inventory-balance.dto';
import { UpdateInventoryBalanceDto } from './dto/update-inventory-balance.dto';
import { InventoryBalanceQueryDto } from './dto/inventory-balance-query.dto';

@Controller('inventory-balances')
export class InventoryBalanceController {
  constructor(
    private readonly inventoryBalanceService: InventoryBalanceService,
  ) {}

  @Get()
  async findAll(@Query() query: InventoryBalanceQueryDto) {
    return this.inventoryBalanceService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryBalanceService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateInventoryBalanceDto) {
    return this.inventoryBalanceService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateInventoryBalanceDto,
  ) {
    return this.inventoryBalanceService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryBalanceService.remove(id);
  }
}
