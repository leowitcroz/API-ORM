import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column({
        length: 63
    })
    name: string;

    @Column({
        length: 127,
        unique: true
    })
    email: string;

    @Column({
        length: 127
    })
    password: string;

    @Column({
        enum: [1, 2]
    })
    role: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;


}