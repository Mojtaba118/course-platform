import {integer, pgEnum, pgTable, text, uuid} from "drizzle-orm/pg-core";
import {createdAt, id, updatedAt} from "@/drizzle/schemaHelper";
import {CourseTable} from "@/drizzle/schema/course";
import {relations} from "drizzle-orm";
import {ProductTable} from "@/drizzle/schema/product";
import {CourseProductsTable} from "@/drizzle/schema/courseProduct";
import {LessonTable} from "@/drizzle/schema/lesson";

export const courseSectionStatuses = ["private","public"] as const;
export type CourseSectionStatus = (typeof courseSectionStatuses)[number];
export const courseSectionStatusEnum = pgEnum("course_section_statuses",courseSectionStatuses)

export const CourseSectionTable = pgTable("course_sections",{
    id,
    courseId:uuid().notNull().references(()=>CourseTable.id,{onDelete:"cascade"}),
    name:text().notNull(),
    status:courseSectionStatusEnum().notNull().default("private"),
    order:integer().notNull(),
    createdAt,
    updatedAt
});

export const CourseSectionRelationships = relations(CourseSectionTable,({one,many})=>({
    course:one(CourseTable,{
        fields:[CourseSectionTable.courseId],
        references:[CourseTable.id]
    }),
    lessons: many(LessonTable),
}))