import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerDto } from '@/partner/dto/create-partner.dto';

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
