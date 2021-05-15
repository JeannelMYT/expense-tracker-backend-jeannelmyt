import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    create(createUserDto: CreateUserDto): Promise<User>;
    getUserDetails(id: number): Promise<User>;
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
}
