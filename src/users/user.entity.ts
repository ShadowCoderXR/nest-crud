import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from '../posts/post.entity';

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, post => post.author)
    posts: Post[];
}