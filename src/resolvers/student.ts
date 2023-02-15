import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Student } from "../entities";
import bcrypt from "bcryptjs";
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

  @Mutation(() => Student)
  async createStudent(
    @Arg("email", () => String)
    email: string,
    @Arg("name", () => String)
    name: string,
    @Arg("password", () => String)
    password: string,
    @Arg("studentId", () => Int)
    studentId: number,
    @Arg("department", () => String)
    department: string,
    @Arg("section", () => String)
    section: string,
    @Arg("phone", () => String)
    phone: string
  ): Promise<Student> {
    const student: Student = Student.create({
      email,
      name,
      password,
      studentId,
      department,
      section,
      phone,
    });
    try {
      await student.save();
      return student;
    } catch (error) {
      throw new Error("Failed to save data");
    }
  }

  @Mutation(() => Student)
  async studentLogin(
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string
  ): Promise<Student> {
    try {
      const student: Student | null = await Student.findOneBy({ email });

      if (!student) {
        throw new Error("Credential not match");
      }
      let isMatch: boolean = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        throw new Error("Credential not match");
      }
      return student;
    } catch (error) {
      throw new Error("Could not login!");
    }
  }

  @Mutation(() => [Student])
  async deleteAllUsers() {}
}

export default StudentResolver;
