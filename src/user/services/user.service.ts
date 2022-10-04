import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { AuthInfo, UpdateInfo } from '../user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async create(info: AuthInfo) {
    info.password = await bcrypt.hash(info.password, 10);
    const userInDb = await this.userRepository.findByCondition({
      username: info.username,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.create(info);
  }

  async findByLogin({ username, password }: AuthInfo) {
    const user = await this.userRepository.findByCondition({
      username: username,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = bcrypt.compareSync(password, user.password);

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async updateUser(id: string, info: UpdateInfo) {
    if (info.password) {
      info.password = await bcrypt.hash(info.password, 10);
    }
    const user = await this.userRepository.findByIdAndUpdate(id, info);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return await this.userRepository.deleteOne(id);
  }
  async validateUser(username: string) {
    const user = await this.userRepository.findByCondition({username: username})
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
