import { Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post()
    createUser(@Body() newUser: CreateUserDto){
        return this.usersService.createUser(newUser);
    }

    @Get(':id')
    getUserById( @Param('id', ParseIntPipe) id: number){
        return this.usersService.getUserById(id);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.deleteUser(id);
    }

    @Post(':id/profile')
    createProfile(@Param('id', ParseIntPipe) id: number, @Body() profile: CreateProfileDto){
        return this.usersService.createProfile(id, profile);
    }
}
