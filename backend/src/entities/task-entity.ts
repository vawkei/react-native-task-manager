import { Entity,Column,PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { UserEntity } from "./user-entity";
import { CoreEntity } from "./core-entity";

@Entity("tasks")
export class TaskEntity extends CoreEntity{
    @PrimaryGeneratedColumn("uuid")
    uuid:string

    @Column({type:"varchar",nullable:false})
    title:string

    @Column({type:"text",nullable:false})
    description:string

    @Column({type:"date",nullable:false})
    dateDue:Date

    @Column({type:"boolean",nullable:true})
    status:boolean

    @ManyToOne(()=>UserEntity,(user)=>user.tasks)//Each task belongs to one user

    user:UserEntity;
}