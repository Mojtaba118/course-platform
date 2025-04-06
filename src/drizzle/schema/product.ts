import {integer, pgEnum, pgTable, text} from "drizzle-orm/pg-core";
import {createdAt, id, updatedAt} from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {CourseProductsTable} from "@/drizzle/schema/courseProduct";

export const productStatuses = ["private","public"] as const;
export type ProductStatus = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum("product_statuses",productStatuses)

export const ProductTable = pgTable("products",{
    id,
    name:text().notNull(),
    description:text().notNull(),
    imageUrl:text().notNull(),
    priceInDollar:integer().notNull(),
    status:productStatusEnum().notNull().default("private"),
    createdAt,
    updatedAt
});

export const ProductRelationships = relations(ProductTable,({many})=>({
    courseProducts:many(CourseProductsTable)
}))