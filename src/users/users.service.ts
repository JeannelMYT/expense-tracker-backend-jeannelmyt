import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExpensesService } from '../expenses/expenses.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => ExpensesService))
    private readonly expensesService: ExpensesService,
  ) {}

  async create(createUserDto: UserDto) {
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
        username,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.findById(id);

    //Check if password is the same as in DB
    if (!(await user?.validatePassword(updateUserDto.password))) {
      throw new UnauthorizedException('Invalid existing password');
    }

    //Check if username exists in the DB
    if (user.username != updateUserDto.username) {
      const usernameExists = await User.findOne({
        where: {
          username: updateUserDto.username,
        },
      });

      if (usernameExists) {
        throw new HttpException(
          'Username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    //Check if email exists in the DB
    if (user.email != updateUserDto.email) {
      const emailExists = await User.findOne({
        where: {
          email: updateUserDto.email,
        },
      });

      if (emailExists) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
    }

    user.username = updateUserDto.username;
    user.email = updateUserDto.email;

    if (updateUserDto.newPassword) {
      user.password = await bcrypt.hash(updateUserDto.newPassword, 8);
    } else {
      user.password = await bcrypt.hash(updateUserDto.password, 8);
    }

    await user.save();

    return {
      message: 'Details Updated!',
    };
  }

  async delete(id: number, deleteUserDto: UserDto) {
    let user = await this.findById(id);

    //Check if password is the same as in DB
    if (!(await user?.validatePassword(deleteUserDto.password))) {
      throw new UnauthorizedException('Invalid existing password');
    }

    //Delete any expenses the user has
    const expenses = this.expensesService.getAllExpenses(id);
    (await expenses).forEach((expense) => {
      this.expensesService.delete(expense.id);
    });

    await timeout(1000); //Wait for expenses to be deleted

    await User.delete(id);

    return {
      message: 'Account Deleted!',
    };
  }
}

const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};
