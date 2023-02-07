import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
// import bcrypt from "bcryptjs";

@Entity()
@ObjectType()
class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @CreateDateColumn()
  @Field(() => String)
  created: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updated: Date;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  department: string;

  @BeforeInsert()
  trimData() {
    this.name = this.name.trim();
    this.email = this.email.trim();
  }

  // @BeforeInsert()
  // async encryptPassword() {
  //   this.password = await bcrypt.hash(this.password.trim(), 8);
  // }
}

export default Teacher;
