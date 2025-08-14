// src/common/base/base.service.ts
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import { PaginationDto } from '@/common/paginationDto';

type QueryProps<T> = {
  paginate: PaginationDto;
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  order?: FindOptionsOrder<T>;
  relations?: string[];
};
export abstract class BaseService<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  constructor(protected readonly repository: Repository<T>) {}

  async findAllPaginated({
    paginate,
    where,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    order = { createdAt: 'DESC' } as any,
    relations,
  }: QueryProps<T>): Promise<{ data: T[]; hasMore: boolean; total: number }> {
    const { page = 1, limit = 10 } = paginate;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where,
      skip,
      take: limit,
      order,
      relations,
    });

    return {
      data,
      hasMore: total > skip + data.length,
      total,
    };
  }
}
