import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
  IsString,
} from 'class-validator';

export class CreateLotDto {
  @IsNumber()
  product_id: number;

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
