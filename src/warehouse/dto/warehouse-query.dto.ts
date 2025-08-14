import { PaginationDto } from '@/common/paginationDto';
import { IsOptional, IsString } from 'class-validator';

export class WarehouseQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;
}
