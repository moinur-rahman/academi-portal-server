import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities";

@Resolver()
class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await User.find({});

      return users;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email", () => String)
    email: string,
    @Arg("name", () => String)
    name: string,
    @Arg("password", () => String)
    password: string
  ): Promise<User> {
    return await User.create({
      email,
      name,
      password,
    }).save();
  }

  @Mutation(() => [User])
  async deleteAllUsers() {}
}

export default UserResolver;
