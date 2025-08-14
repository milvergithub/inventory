import { PaginationDto } from '@/common/paginationDto';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LotQueryDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  lot_number: string;

  @IsOptional()
  @IsDateString()
  expiration_date?: string;

  @IsOptional()
  @IsDateString()
  manufacture_date?: string;
}
