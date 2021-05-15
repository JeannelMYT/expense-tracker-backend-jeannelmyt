import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    //Check if username exists in the DB
    const usernameExists = await User.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (usernameExists) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Check if email exists in the DB
    const emailExists = await User.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (emailExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const user = User.create(createUserDto);
    await user.save();

    //Delete password and details user doesn't need to see
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
  }

  async getUserDetails(id: number): Promise<User> {
    const user = await this.findById(id);

    //Remove data user doesn't need to see before returning user details
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByUsername(username: string) {
    return await User.findOne({
      where: {
        username: username,
      },
    });
  }
}
