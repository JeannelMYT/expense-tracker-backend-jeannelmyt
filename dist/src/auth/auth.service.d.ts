import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthValidateDto } from './dto/auth-validate.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(authLoginDto: AuthLoginDto): Promise<{
        accessToken: string;
        userId: number;
    }>;
    validateUser(authLoginDto: AuthLoginDto): Promise<User>;
    validate(authValidateDto: AuthValidateDto): Promise<Boolean>;
}
