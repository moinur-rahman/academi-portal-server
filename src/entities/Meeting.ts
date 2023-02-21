import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class Meeting extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  meetingUrl: string;
}

export default Meeting;
