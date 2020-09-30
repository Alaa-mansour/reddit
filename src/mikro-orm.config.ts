import { MikroORM } from "@mikro-orm/core";
import path from "path";

import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post],
    dbName: 'reddit',
    type: 'postgresql',
    debug: !__prod__ //log what sql is doing, while in dev
} as Parameters<typeof MikroORM.init>[0];

//TYPESCRRPT: without s Parameters dbName will be just a string but we want it to be 'reddit'
//the same thing with type want it to be 'postgresq';
//[0] is because parameters returns an array and we just want the first parameter
