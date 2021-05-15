import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(authLoginDto: AuthLoginDto): Promise<{
        access_token: string;
    }>;
    validateUser(authLoginDto: AuthLoginDto): Promise<User>;
}
