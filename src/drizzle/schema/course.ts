import {pgTable, text} from "drizzle-orm/pg-core";
import {createdAt, id, updatedAt} from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {CourseProductsTable} from "@/drizzle/schema/courseProduct";
import {UserCourseAccessTable} from "@/drizzle/schema/userCourseAccess";

export const CourseTable = pgTable("courses",{
    id,
    name:text().notNull(),
    description:text().notNull(),
    createdAt,
    updatedAt
});

export const CourseRelationships = relations(CourseTable,({many})=>({
    courseProducts:many(CourseProductsTable),
    userCourseAccesses: many(UserCourseAccessTable),
}))