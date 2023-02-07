import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Student } from "../entities";

@Resolver()
class StudentResolver {
  @Query(() => [Student])
  async getAllStudents(): Promise<Student[]> {
    try {
      const students = await Student.find({});

      return students;
    } catch (error) {
      return error;
    }
  }

  @Query(() => Student)
  async loginStudent(
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string
  ): Promise<Student | null> {
    return await Student.findOneBy({ email, password });
  }

  @Mutation(() => Student)
  async createStudent(
    @Arg("email", () => String)
    email: string,
    @Arg("name", () => String)
    name: string,
    @Arg("password", () => String)
    password: string,
    @Arg("ID", () => Int)
    ID: number,
    @Arg("department", () => String)
    department: string,
    @Arg("section", () => String)
    section: string
  ): Promise<Student> {
    return await Student.create({
      email,
      name,
      password,
      ID,
      department,
      section,
    }).save();
  }

  @Mutation(() => [Student])
  async deleteAllUsers() {}
}

export default StudentResolver;
