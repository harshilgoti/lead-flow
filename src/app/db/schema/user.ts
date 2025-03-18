import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as zod from "zod";

export const users = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const UserSchema = createSelectSchema(users);
export const NewUserSchema = createInsertSchema(users).pick({
  id: true,
  fullName: true,
  password: true,
  email: true,
});

export type TUser = zod.infer<typeof UserSchema>;
export type TNewUser = zod.infer<typeof NewUserSchema>;
