import "reflect-metadata";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import microConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/post";

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    })

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('Server is running on port: 4000');

    })


}

main().catch(err => {
    console.error(err);
});



