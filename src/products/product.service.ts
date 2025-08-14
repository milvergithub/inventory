import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@/products/product.entity';
import { CreateProductDto } from '@/products/dto/create-product.dto';
import { UpdateProductDto } from '@/products/dto/update-product.dto';
import { ProductQueryDto } from '@/products/dto/product-query.dto';
import { BaseService } from '@/common/base.service';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  async findAll(request: ProductQueryDto) {
    //const where = request.search ? { name: ILike(`%${request.search}%`) } : {};
    const where = {};
    if (request.name) {
      where['name'] = ILike(`%${request.name}%`);
    }
    if (request.sku) {
      where['sku'] = ILike(`%${request.sku}%`);
    }
    if (request.code) {
      where['code'] = ILike(`%${request.code}%`);
    }
    if (request.categoryId) {
      where['categoryId'] = request.categoryId;
    }

    return this.findAllPaginated({
      paginate: request,
      where,
      relations: ['category'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async create(
    createProductDto: CreateProductDto,
    userId: number,
  ): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      createdBy: userId,
      updatedBy: userId,
    });
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    userId: number,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    product.updatedBy = userId;
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
