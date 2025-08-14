import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/common/base.service';
import { Lot } from '@/lot/lot.entity';
import { CreateLotDto } from '@/lot/dto/create-lot.dto';
import { UpdateLotDto } from '@/lot/dto/update-lot.dto';
import { LotQueryDto } from '@/lot/dto/lot-query.dto';

@Injectable()
export class LotService extends BaseService<Lot> {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>,
  ) {
    super(lotRepository);
  }

  async findAll(request: LotQueryDto) {
    const where = {};
    if (request.lot_number) {
      where['lot_number'] = ILike(`%${request.lot_number}%`);
    }
    if (request.expiration_date) {
      where['expiration_date'] = request.expiration_date;
    }

    if (request.manufacture_date) {
      where['manufacture_date'] = request.manufacture_date;
    }

    return this.findAllPaginated({
      paginate: request,
      where,
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<Lot> {
    const lot = await this.lotRepository.findOne({
      where: { id },
    });
    if (!lot) throw new NotFoundException(`Lot with id ${id} not found`);
    return lot;
  }

  async create(createLotDto: CreateLotDto): Promise<Lot> {
    const lot = this.lotRepository.create({
      ...createLotDto,
    });
    return this.lotRepository.save(lot);
  }

  async update(id: number, updateLotDto: UpdateLotDto): Promise<Lot> {
    const lot = await this.findOne(id);
    Object.assign(lot, updateLotDto);
    return this.lotRepository.save(lot);
  }

  async remove(id: number): Promise<void> {
    await this.lotRepository.delete(id);
  }
}
