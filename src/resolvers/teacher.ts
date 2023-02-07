import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Teacher } from "../entities";

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
    department: string
  ): Promise<Teacher> {
    return await Teacher.create({
      email,
      name,
      password,
      department,
    }).save();
  }
}

export default TeacherResolver;
