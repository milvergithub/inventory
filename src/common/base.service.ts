// src/common/base/base.service.ts
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import { PaginationDto } from '@/common/paginationDto';

export abstract class BaseService<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  constructor(protected readonly repository: Repository<T>) {}

  async findAllPaginated(
    paginationDto: PaginationDto,
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    order: FindOptionsOrder<T> = { createdAt: 'DESC' } as any,
  ): Promise<{ data: T[]; hasMore: boolean; total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where,
      skip,
      take: limit,
      order,
    });

    return {
      data,
      hasMore: total > skip + data.length,
      total,
    };
  }
}
