import {
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreatePartnerDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  description?: string;
}
