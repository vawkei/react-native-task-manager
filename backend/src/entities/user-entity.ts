import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core-entity";
import { TaskEntity } from "./task-entity";

@Entity()
export class UserEntity extends CoreEntity{
    @PrimaryGeneratedColumn("uuid")
    uuid:string;

    @Column({type:"varchar",nullable:true})
    username:string

    @Column({type:"varchar",nullable:false})
    email:string;

    @Column({type:"varchar",nullable:false})
    password:string;

    @Column({type:"boolean",nullable:true})
    isRegistered:boolean

    @OneToMany(()=>TaskEntity,(task)=>task.user) //A user can have many tasks 
    tasks:TaskEntity[]
};