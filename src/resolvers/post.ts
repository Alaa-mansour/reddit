import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext): Promise<Post | null> {
        return em.findOne(Post, { id });
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() { em }: MyContext): Promise<Post> {
        const post = em.create(Post, { title });    // // it's equilvant to this row new Post("My first post!"); just creating an instance of Post
        await em.persistAndFlush(post); // to insert the instance into the DB
        return post;
    }


    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext): Promise<Post | null> {
        const post = await em.findOne(Post, { id });
        if (!post) return null;
        if (title !== undefined) {
            post.title = title;
            await em.persistAndFlush(post);
        }
        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id') id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        await em.nativeDelete(Post, { id });
        return true;
    }
}


/*
    [] Queries are for getting data
    [] Mutations is for updating deleting inserting, anything you would like to change on the server
*/