import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@/auth/user/user.entity';
import { CreateUserDto } from '@/auth/user/dto/create-user.dto';
import { UpdateUserDto } from '@/auth/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(
    createUserDto: CreateUserDto,
    creatorId?: number,
  ): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      10,
    );
    const user = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      passwordHash: hashedPassword,
      createdBy: creatorId || null,
      updatedBy: creatorId || null,
    });
    return this.userRepository.save(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    updaterId?: number,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.username) user.username = updateUserDto.username;
    if (updateUserDto.email) user.email = updateUserDto.email;

    user.updatedBy = updaterId || null;

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
