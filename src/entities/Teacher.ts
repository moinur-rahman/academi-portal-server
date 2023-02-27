import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcryptjs";

import Post from "./Post";
@Entity()
@ObjectType()
class Teacher extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @CreateDateColumn()
  created: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updated: Date;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String)
  @Column()
  department: string;

  @Field(() => String)
  @Column()
  phone: string;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, nullable: true })
  tokens: string[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.teacher)
  posts: Post[];

  @BeforeInsert()
  trimData() {
    this.name = this.name.trim();
    this.email = this.email.trim();
  }

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password.trim(), 8);
  }
}

export default Teacher;
