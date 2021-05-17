import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: UserDto): Promise<import("../entities/user.entity").User>;
    getUserDetails(id: number): Promise<import("../entities/user.entity").User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    delete(id: number, userDto: UserDto): Promise<{
        message: string;
    }>;
}
