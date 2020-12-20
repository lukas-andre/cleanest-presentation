import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindManyOptions,
  DeepPartial,
  FindOneOptions,
  DeleteResult,
} from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcryptjs';
import { CreateUserRequestDto } from '../dto/createUserRequest.dto';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { CreateUserResponseDto } from '../dto/createUserResponse.dto';
import { RolesService } from './roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'example-user-db')
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly rolesService: RolesService,
  ) {}

  async create(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto | boolean> {
    const role = await this.rolesService.findOne({
      where: { name: createUserRequestDto.role },
    });

    if (!role) {
      return false;
    }

    const exists: number = await this.usersRepository.count({
      where: { email: createUserRequestDto.email },
    });

    if (exists) {
      return false;
    }

    const newUser = Object.assign(new User(), {
      ...createUserRequestDto,
      password: await this.hashPasword(createUserRequestDto.password),
      role,
    });

    const { password, ...result } = await this.usersRepository.save(newUser);
    return result;
  }

  async findById(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async find(options: FindManyOptions<User>) {
    return await this.usersRepository.find(options);
  }

  async findOne(options?: FindOneOptions<User>): Promise<User | undefined> {
    return await this.usersRepository.findOne(options);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async findAndCount(
    options: FindManyOptions<User>,
  ): Promise<[User[], number]> {
    return await this.usersRepository.findAndCount(options);
  }

  async edit(id: number, update: DeepPartial<User> | User): Promise<User> {
    return await this.usersRepository.save(
      Object.assign(await this.findById(id), update),
    );
  }

  async hashPasword(password: string): Promise<string> {
    return await hash(password, this.configService.get('auth.saltLength'));
  }

  async validatePassword(
    incomingPassword: string,
    databaseUserPassword: string,
  ): Promise<boolean> {
    return await compare(incomingPassword, databaseUserPassword);
  }
}
