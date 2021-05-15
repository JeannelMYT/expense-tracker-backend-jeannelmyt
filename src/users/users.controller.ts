import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //User details can only be retrieved after logging in
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserDetails(@Param('id') id: string) {
    return this.usersService.getUserDetails(+id);
  }
}
