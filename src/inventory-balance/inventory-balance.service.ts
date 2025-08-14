import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/common/base.service';
import { InventoryBalanceQueryDto } from '@/inventory-balance/dto/inventory-balance-query.dto';
import { InventoryBalance } from '@/inventory-balance/inventory-balance.entity';
import { CreateInventoryBalanceDto } from '@/inventory-balance/dto/create-inventory-balance.dto';
import { UpdateInventoryBalanceDto } from '@/inventory-balance/dto/update-inventory-balance.dto';

@Injectable()
export class InventoryBalanceService extends BaseService<InventoryBalance> {
  constructor(
    @InjectRepository(InventoryBalance)
    private readonly inventoryBalanceRepository: Repository<InventoryBalance>,
  ) {
    super(inventoryBalanceRepository);
  }

  async findAll(request: InventoryBalanceQueryDto) {
    const where = {};

    return this.findAllPaginated({
      paginate: request,
      where,
      relations: ['partner', 'warehouse', 'product', 'lot'],
    });
  }

  async findOne(id: number): Promise<InventoryBalance> {
    const inventoryBalance = await this.inventoryBalanceRepository.findOne({
      where: { id },
      relations: ['partner', 'warehouse', 'product', 'lot'],
    });
    if (!inventoryBalance)
      throw new NotFoundException(`InventoryBalance with id ${id} not found`);
    return inventoryBalance;
  }

  async create(dto: CreateInventoryBalanceDto): Promise<InventoryBalance> {
    const exists = await this.inventoryBalanceRepository.findOne({
      where: {
        partner: { id: dto.partner_id },
        warehouse: { id: dto.warehouse_id },
        product: { id: dto.product_id },
        lot: { id: dto.lot_id },
      },
    });
    if (exists)
      throw new ConflictException(
        'InventoryBalance already exists for this combination',
      );

    const inventoryBalance = this.inventoryBalanceRepository.create({
      ...dto,
    });
    return this.inventoryBalanceRepository.save(inventoryBalance);
  }

  async update(
    id: number,
    dto: UpdateInventoryBalanceDto,
  ): Promise<InventoryBalance> {
    const inventoryBalance = await this.findOne(id);
    Object.assign(inventoryBalance, dto);
    return this.inventoryBalanceRepository.save(inventoryBalance);
  }

  async remove(id: number): Promise<void> {
    await this.inventoryBalanceRepository.delete(id);
  }
}
