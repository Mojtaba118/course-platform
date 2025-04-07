import { UserTable } from "@/drizzle/schema/user";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export async function insertUser(data: typeof UserTable.$inferInsert) {
  const [user] = await db
    .insert(UserTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [UserTable.clerkUserId],
      set: data,
    });

  if (user == null) throw new Error("Failed to Create User");

  return user;
}

export async function updateUser(
  clerkUserId: string,
  data: Partial<typeof UserTable.$inferInsert>,
) {
  const [user] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (user == null) throw new Error("Failed to Update User");

  return user;
}

export async function deleteUser(clerkUserId: string) {
  const [user] = await db
    .update(UserTable)
    .set({
      deletedAt: new Date(),
    })
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (user == null) throw new Error("Failed to Update User");

  return user;
}
