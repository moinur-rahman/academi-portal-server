import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { Teacher, Post } from "../entities";

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
    try {
      const teacher = await Teacher.findOne({ where: { id: teacherId } });
      if (!teacher) {
        throw new Error("Teacher Id not found");
      }
      const post: Post = Post.create({ title, description, teacher });
      await post.save();
      return post;
    } catch (error) {
      throw new Error("Post couldn't be saved");
    }
  }
}

export default PostResolver;
