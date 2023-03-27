import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Committee } from "./Committee";

@Entity({name:"group"})
export class Group {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 20})
    groupName: string;

    @OneToMany(() => User, (user) => user.group)
    user: User[];

    @OneToMany(() => Committee, (committee) => committee.group)
    committee: Committee[];
}
