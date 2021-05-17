import { User } from '../entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExpensesService } from '../expenses/expenses.service';
export declare class UsersService {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(createUserDto: UserDto): Promise<User>;
    getUserDetails(id: number): Promise<User>;
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    delete(id: number, deleteUserDto: UserDto): Promise<{
        message: string;
    }>;
}
