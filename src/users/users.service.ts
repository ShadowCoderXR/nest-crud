import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
        ) {}

    async createUser(user: CreateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        });

        if(userFound){
            throw new ConflictException('Username already exists');
        }

        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    getUsers(){
        return this.userRepository.find();
    }

    async getUserById(id: number){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            },
            relations: ['profile', 'posts']
        });

        if(!userFound){
            throw new NotFoundException('User not found');
        }

        return userFound;
    }

    async updateUser(id: number, user: UpdateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if(!userFound){
            throw new NotFoundException('User not found');
        }

        this.userRepository.update(id, user);

        return {'message': 'User updated successfully'}
    }

    async deleteUser(id: number){
        const result = await this.userRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException('User not found');
        }

        return {'message': 'User deleted successfully'}
    }

    async createProfile(id: number, profile: CreateProfileDto){
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        });

        if(!userFound){
            throw new NotFoundException('User not found');
        }

        const newProfile = this.profileRepository.create(profile);
        const savedProfile = await this.profileRepository.save(newProfile);
        userFound.profile = savedProfile;

        return this.userRepository.save(userFound);
    }

}
