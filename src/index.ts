import { MikroORM } from "@mikro-orm/core";

import { __prod__ } from "./constants";

const main = async () => {
    const orm = await MikroORM.init({
        entities: [],
        dbName: 'reddit',
        type: 'postgresql',
        debug: !__prod__ //log what sql is doing, while in dev
    })
}

console.log('isDev>', process.env.NODE_ENV);


