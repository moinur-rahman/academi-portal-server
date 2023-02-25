import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Teacher } from "../entities";
import bcrypt from "bcryptjs";
@Resolver()
class TeacherResolver {
  @Query(() => [Teacher])
  async getAllTeachers(): Promise<Teacher[]> {
    try {
      const students = await Teacher.find();

      if (students == null) throw new Error("Students not found");

      return students;
    } catch (error) {
      return error;
    }
  }

  @Query(() => Teacher)
  async getTeacherById(@Arg("id", () => String) id: string): Promise<Teacher> {
    console.log(id);
    const student = await Teacher.findOne({ where: { id } });

    if (student == null) throw new Error("Teacher with ID not found");

    return student;
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
    const teacher: Teacher = Teacher.create({
      email,
      name,
      password,
      department,
      phone,
    });

    try {
      await teacher.save();
      return teacher;
    } catch (error) {
      throw new Error("Failed to save data");
    }
  }

  @Mutation(() => Teacher)
  async teacherLogin(
    @Arg("email", () => String)
    email: string,
    @Arg("password", () => String)
    password: string
  ): Promise<Teacher> {
    try {
      const teacher = await Teacher.findOneBy({ email });

      if (!teacher) {
        throw new Error("Credential doesn't match");
      }
      let isMatch: boolean = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        throw new Error("Credential doesn't match");
      }
      return teacher;
    } catch (error) {
      throw new Error("Could not login!");
    }
  }
}

export default TeacherResolver;
