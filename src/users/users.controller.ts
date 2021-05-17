import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }

  //User details can only be retrieved after logging in
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserDetails(@Param('id') id: number) {
    return this.usersService.getUserDetails(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @Body() userDto: UserDto) {
    return this.usersService.delete(+id, userDto);
  }
}
