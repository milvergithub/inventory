import { PartialType } from '@nestjs/mapped-types';
import { CreateLotDto } from '@/lot/dto/create-lot.dto';

export class UpdateLotDto extends PartialType(CreateLotDto) {}
