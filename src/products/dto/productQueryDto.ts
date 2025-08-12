import { PaginationDto } from '@/common/paginationDto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
