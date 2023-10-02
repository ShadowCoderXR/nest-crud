import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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
}