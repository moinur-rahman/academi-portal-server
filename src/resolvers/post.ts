import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { Teacher, Post } from "../entities";
import postgres from "../db/postgres";

@Resolver()
class PostResolver {
  @Query(() => [Post])
  async getAllPosts(): Promise<Post[]> {
    try {
      const posts: Post[] = await Post.find({});

      return posts;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String)
    title: string,
    @Arg("description", () => String)
    description: string,
    @Arg("teacherId", () => String)
    teacherId: string
  ): Promise<Post> {
    const teacher = await postgres
      .getRepository(Teacher)
      .findOne({ where: { id: teacherId } });
    const post = await postgres
      .getRepository(Post)
      .create({ title, description, teacher });
    await postgres.getRepository(Post).save(post);
    return post;
  }
}

export default PostResolver;
