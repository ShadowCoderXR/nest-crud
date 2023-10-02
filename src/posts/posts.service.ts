import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';


@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private userService: UsersService
    ){}

    async createPost(post: CreatePostDto){
        const userFound = await this.userService.getUserById(post.authorId);

        if(!userFound){
            throw new NotFoundException('User not found');
        }

        const newPost = this.postRepository.create(post);
        return this.postRepository.save(newPost);
    }

    getPosts(){
        return this.postRepository.find({
            relations: ['author']
        });
    }
}
