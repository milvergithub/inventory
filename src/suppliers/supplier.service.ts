import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierQueryDto } from './dto/supplier-query.dto';
import { BaseService } from '@/common/base.service';

@Injectable()
export class SupplierService extends BaseService<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {
    super(supplierRepository);
  }

  async findAll(request: SupplierQueryDto) {
    const where = {};
    if (request.name) where['name'] = request.name;
    if (request.email) where['email'] = request.email;

    return this.findAllPaginated({
      paginate: request,
      where,
    });
  }

  async findOne(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier)
      throw new NotFoundException(`Supplier with id ${id} not found`);
    return supplier;
  }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.supplierRepository.create({
      ...createSupplierDto,
    });
    return this.supplierRepository.save(supplier);
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const supplier = await this.findOne(id);
    Object.assign(supplier, updateSupplierDto);
    return this.supplierRepository.save(supplier);
  }

  async remove(id: number): Promise<void> {
    await this.supplierRepository.delete(id);
  }
}
