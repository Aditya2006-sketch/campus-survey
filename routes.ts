import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, hashPassword } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth (Passport)
  setupAuth(app);

  // Issues API
  app.get(api.issues.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    // If admin, show all? For now, requirement says "List of all issues reported by the logged-in user" for "Issue Status Tracking Page"
    // But admin might need to see all.
    // Let's assume user sees their own.
    const issues = await storage.getIssues(req.user!.id);
    res.json(issues);
  });

  app.post(api.issues.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const input = api.issues.create.input.parse(req.body);
      const issue = await storage.createIssue({ ...input, userId: req.user!.id });
      res.status(201).json(issue);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Ragging Reports API
  app.post(api.ragging.create.path, async (req, res) => {
    try {
      const input = api.ragging.create.input.parse(req.body);
      const report = await storage.createRaggingReport(input);
      res.status(201).json(report);
    } catch (err) {
       if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  if ((await storage.getIssues()).length === 0) {
    const hashedPassword = await hashPassword("admin123");
    const adminUser = await storage.createUser({
      email: "admin@kits.edu",
      password: hashedPassword,
      fullName: "Admin User",
    });
    
    // Create a demo user
    // We can't easily hash password here without importing the helper from auth.ts or duplicating logic.
    // For MVP seed, let's skip creating users with valid passwords unless we move hashing to storage or a shared helper.
    // But we can create issues if we have a user.
    
    await storage.createIssue({
      userId: adminUser.id,
      type: "Electricity",
      location: "Hostel A - Room 101",
      description: "Fan not working",
      status: "Pending",
      imageUrl: null,
    });
  }

  return httpServer;
}
