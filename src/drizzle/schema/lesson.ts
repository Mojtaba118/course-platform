import {integer, pgEnum, pgTable, text, uuid} from "drizzle-orm/pg-core";
import {createdAt, id, updatedAt} from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";
import {CourseSectionTable} from "@/drizzle/schema/courseSection";
import {UserLessonCompleteTable} from "@/drizzle/schema/userLessonComplete";

export const lessonStatuses = ["private","public","preview"] as const;
export type LessonStatus = (typeof lessonStatuses)[number];
export const lessonStatusEnum = pgEnum("lesson_statuses",lessonStatuses)

export const LessonTable = pgTable("lessons",{
    id,
    sectionId:uuid().notNull().references(()=>CourseSectionTable.id,{onDelete:"cascade"}),
    name:text().notNull(),
    description:text(),
    youtubeVideoId:text().notNull(),
    order:integer().notNull(),
    status:lessonStatusEnum().notNull().default("private"),
    createdAt,
    updatedAt
});

export const LessonRelationships = relations(LessonTable,({one,many})=>({
    section:one(CourseSectionTable,{
        fields:[LessonTable.sectionId],
        references:[CourseSectionTable.id]
    }),
    userLessonsComplete: many(UserLessonCompleteTable),
}))