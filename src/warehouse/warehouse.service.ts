import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from '@/warehouse/warehouse.entity';
import { CreateWarehouseDto } from '@/warehouse/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '@/warehouse/dto/update-warehouse.dto';
import { WarehouseQueryDto } from '@/warehouse/dto/warehouse-query.dto';
import { BaseService } from '@/common/base.service';

@Injectable()
export class WarehouseService extends BaseService<Warehouse> {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {
    super(warehouseRepository);
  }

  async findAll(request: WarehouseQueryDto) {
    const where = {};
    if (request.name) {
      where['name'] = ILike(`%${request.name}%`);
    }

    return this.findAllPaginated({
      paginate: request,
      where,
      relations: ['partner'],
    });
  }

  async findOne(id: number): Promise<Warehouse> {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id },
      relations: ['partner'],
    });
    if (!warehouse)
      throw new NotFoundException(`Warehouse with id ${id} not found`);
    return warehouse;
  }

  async create(
    createWarehouseDto: CreateWarehouseDto,
    creatorId?: number,
  ): Promise<Warehouse> {
    const warehouse = this.warehouseRepository.create({
      ...createWarehouseDto,
      createdBy: creatorId || null,
      updatedBy: creatorId || null,
    });
    return this.warehouseRepository.save(warehouse);
  }

  async update(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
    updaterId?: number,
  ): Promise<Warehouse> {
    const warehouse = await this.findOne(id);
    Object.assign(warehouse, updateWarehouseDto);
    warehouse.updatedBy = updaterId || null;
    return this.warehouseRepository.save(warehouse);
  }

  async remove(id: number): Promise<void> {
    await this.warehouseRepository.delete(id);
  }
}
