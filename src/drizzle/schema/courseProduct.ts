import {pgTable, primaryKey, uuid} from "drizzle-orm/pg-core";
import {CourseTable} from "@/drizzle/schema/course";
import {ProductTable} from "@/drizzle/schema/product";
import {createdAt,updatedAt} from "@/drizzle/schemaHelper";
import {relations} from "drizzle-orm";

export const CourseProductsTable = pgTable("course_products",{
    courseId:uuid().notNull().references(()=>CourseTable.id,{onDelete:"restrict"}),
    productId:uuid().notNull().references(()=>ProductTable.id,{onDelete:"cascade"}),
    createdAt,
    updatedAt
}, t=>[primaryKey(t.courseId,t.productId)]);

export const CourseProductRelationships = relations(CourseProductsTable,({one})=>({
    course:one(CourseTable,{
        fields:[CourseProductsTable.courseId],
        references:[CourseTable.id]
    }),
    product:one(ProductTable,{
        fields:[CourseProductsTable.productId],
        references:[ProductTable.id]
    }),
}))