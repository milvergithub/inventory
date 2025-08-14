import { PaginationDto } from '@/common/paginationDto';
import { IsOptional, IsString } from 'class-validator';

export class CategoryQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
}
