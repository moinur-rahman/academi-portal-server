import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
//   ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// import Teacher from "./Teacher";

@Entity()
@ObjectType()
class Student extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id!: string;

  @CreateDateColumn()
  @Field(() => String)
  created: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updated: Date;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  description: string;

//   @ManyToOne(()=>Teacher,(teacher)=>teacher.posts){
//     teacher: Teacher
//   }


  @BeforeInsert()
  trimData() {
    this.title = this.title.trim();
    this.description = this.description.trim();
  }
}

export default Student;
