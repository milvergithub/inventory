import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Req,
  Query,
} from '@nestjs/common';
import { ProductService } from '@/products/product.service';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { UpdateProductDto } from '@/products/dto/update-product.dto';
import { ProductQueryDto } from '@/products/dto/product-query.dto';

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query() request: ProductQueryDto) {
    return this.productService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req) {
    // Asumiendo que tienes un sistema auth que inyecta usuario en req.user
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const userId = req.user?.id;
    return this.productService.create(createProductDto, userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const userId = req.user?.id;
    return this.productService.update(id, updateProductDto, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
