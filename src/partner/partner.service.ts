import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Partner } from './partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find({ relations: ['user', 'warehouses'] });
  }

  async findOne(id: number): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({
      where: { id },
      relations: ['user', 'warehouses'],
    });
    if (!partner)
      throw new NotFoundException(`Partner with id ${id} not found`);
    return partner;
  }

  async create(
    createPartnerDto: CreatePartnerDto,
    creatorId?: number,
  ): Promise<Partner> {
    const partner = this.partnerRepository.create({
      ...createPartnerDto,
      createdBy: creatorId || null,
      updatedBy: creatorId || null,
    });
    return this.partnerRepository.save(partner);
  }

  async update(
    id: number,
    updatePartnerDto: UpdatePartnerDto,
    updaterId?: number,
  ): Promise<Partner> {
    const partner = await this.findOne(id);
    Object.assign(partner, updatePartnerDto);
    partner.updatedBy = updaterId || null;
    return this.partnerRepository.save(partner);
  }

  async remove(id: number): Promise<void> {
    await this.partnerRepository.delete(id);
  }
}
