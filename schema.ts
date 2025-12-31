import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const issueTypeEnum = pgEnum("issue_type", [
  "Electricity",
  "Water",
  "Internet",
  "Cleanliness",
  "Other",
]);

export const issueStatusEnum = pgEnum("issue_status", [
  "Pending",
  "Solved",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: issueTypeEnum("type").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  status: issueStatusEnum("status").default("Pending").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const raggingReports = pgTable("ragging_reports", {
  id: serial("id").primaryKey(),
  victimName: text("victim_name").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  isAnonymous: boolean("is_anonymous").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Base Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, isAdmin: true });
export const insertIssueSchema = createInsertSchema(issues).omit({ id: true, userId: true, createdAt: true, status: true });
export const insertRaggingReportSchema = createInsertSchema(raggingReports).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Issue = typeof issues.$inferSelect;
export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type RaggingReport = typeof raggingReports.$inferSelect;
export type InsertRaggingReport = z.infer<typeof insertRaggingReportSchema>;
