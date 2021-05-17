import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthValidateDto } from './dto/auth-validate.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
    };

    //Create access token for validating transactions
    return {
      accessToken: this.jwtService.sign(payload),
      userId: user.id,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { username, password } = authLoginDto;

    const user = await this.usersService.findByUsername(username);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async validate(authValidateDto: AuthValidateDto): Promise<Boolean> {
    const { id, password } = authValidateDto;

    const user = await this.usersService.findById(id);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
