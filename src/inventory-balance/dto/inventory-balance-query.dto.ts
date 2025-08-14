import { IsOptional, IsInt, Min } from 'class-validator';
import { PaginationDto } from '@/common/paginationDto';

export class InventoryBalanceQueryDto extends PaginationDto {
  @IsOptional() @IsInt() partner_id?: number;
  @IsOptional() @IsInt() warehouse_id?: number;
  @IsOptional() @IsInt() product_id?: number;
  @IsOptional() @IsInt() lot_id?: number;

  @IsOptional() @IsInt() @Min(0) min_quantity?: number;
  @IsOptional() @IsInt() @Min(0) max_quantity?: number;
}
