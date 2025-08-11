import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@/categories/category.entity';
import { CategoryService } from '@/categories/category.service';
import { CategoryController } from '@/categories/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService], // exporta si quieres usar en otros módulos
})
export class CategoryModule {}
