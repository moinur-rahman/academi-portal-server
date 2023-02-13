import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Teacher } from "../entities";
import bcrypt from "bcryptjs";
@Resolver()
class TeacherResolver {
  @Query(() => [Teacher])
  async getAllTeachers(): Promise<Teacher[]> {
    try {
      const students = await Teacher.find({});

      return students;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Teacher)
  async createTeacher(
    @Arg("email", () => String)
    email: string,
    @Arg("name", () => String)
    name: string,
    @Arg("password", () => String)
    password: string,
    @Arg("department", () => String)
    department: string,
    @Arg("phone", () => String)
    phone: string
  ): Promise<Teacher> {
    return await Teacher.create({
      email,
      name,
      password,
      department,
      phone,
    }).save();
  }

  @Mutation(() => Teacher)
  async teacherLogin(
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string
  ): Promise<Teacher> {
    try {
      let user: Teacher = await Teacher.findOneBy({ email });

      if (!user) {
        throw new Error("Credential not match");
      }
      let isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Credential not match");
      }
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default TeacherResolver;
