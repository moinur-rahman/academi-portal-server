import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import Teacher from "./Teacher";

@Entity()
@ObjectType()
class Post extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @CreateDateColumn()
  created: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated: Date;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Teacher)
  @ManyToOne(() => Teacher, (teacher) => teacher.posts)
  teacher: Teacher;

  @BeforeInsert()
  trimData() {
    this.title = this.title.trim();
    this.description = this.description.trim();
  }
}

export default Post;
