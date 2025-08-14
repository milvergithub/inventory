import { IsOptional, IsInt, Min } from 'class-validator';

export class UpdateInventoryBalanceDto {
  @IsOptional()
  @IsInt()
  partner_id?: number;

  @IsOptional()
  @IsInt()
  warehouse_id?: number;

  @IsOptional()
  @IsInt()
  product_id?: number;

  @IsOptional()
  @IsInt()
  lot_id?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;
}
