import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";

import microConfig from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    // it's equilvant to this row new Post("My first post!"); just creating an instance of Post
    const post = orm.em.create(Post, { title: "My first post!" });
    await orm.em.persistAndFlush(post); // to insert the instance into the DB

    const posts = await orm.em.find(Post, {});
    console.log(posts);

}

main().catch(err => {
    console.error(err);
});



