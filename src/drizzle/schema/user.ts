import {pgEnum, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";
import {createdAt, id, updatedAt} from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {UserCourseAccessTable} from "@/drizzle/schema/userCourseAccess";

export const userRoles = ["user","admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_roles",userRoles)

export const UserTable = pgTable("users",{
    id,
    clerkUserId:text().notNull().unique(),
    email:text().notNull(),
    name:text().notNull(),
    role:userRoleEnum().notNull().default("user"),
    imageUrl:text(),
    deletedAt:timestamp({withTimezone:true}),
    createdAt,
    updatedAt
});

export const UserRelationships = relations(UserTable, ({ many }) => ({
    userCourseAccesses: many(UserCourseAccessTable),
}))