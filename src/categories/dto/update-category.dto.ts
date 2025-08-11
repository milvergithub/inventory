import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from '@/categories/dto/create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
