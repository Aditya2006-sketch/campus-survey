import { users, issues, raggingReports, type User, type InsertUser, type Issue, type InsertIssue, type RaggingReport, type InsertRaggingReport } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getIssues(userId?: number): Promise<Issue[]>;
  createIssue(issue: InsertIssue & { userId: number }): Promise<Issue>;
  
  createRaggingReport(report: InsertRaggingReport): Promise<RaggingReport>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getIssues(userId?: number): Promise<Issue[]> {
    if (userId) {
      return db.select().from(issues).where(eq(issues.userId, userId));
    }
    return db.select().from(issues);
  }

  async createIssue(issue: InsertIssue & { userId: number }): Promise<Issue> {
    const [newIssue] = await db.insert(issues).values(issue).returning();
    return newIssue;
  }

  async createRaggingReport(report: InsertRaggingReport): Promise<RaggingReport> {
    const [newReport] = await db.insert(raggingReports).values(report).returning();
    return newReport;
  }
}

export const storage = new DatabaseStorage();
