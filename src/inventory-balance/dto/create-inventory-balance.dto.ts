import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateInventoryBalanceDto {
  @IsNotEmpty()
  @IsInt()
  partner_id: number;

  @IsNotEmpty()
  @IsInt()
  warehouse_id: number;

  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  lot_id: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;
}
