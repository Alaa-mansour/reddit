import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
    // id createdAt updateAt title are the columns that will be created on the databse
    @PrimaryKey()
    id!: number;

    @Property({ type: "date" })
    createdAt = new Date();

    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property({ type: "text" })
    title!: string;

}
