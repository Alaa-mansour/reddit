import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
    // id createdAt updateAt title are the columns that will be created on the databse
    @Field()
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({ type: "date" })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field() //with this you choose what you want to expose and what you want to hide
    //, without @Field() it wont be shown in the graphql
    @Property({ type: "text" })
    title!: string;

}
