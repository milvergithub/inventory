import { PaginationDto } from '@/common/paginationDto';
import { IsOptional, IsString } from 'class-validator';

export class UserQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
