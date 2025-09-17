// src/types/dashboard.ts
import type { Route } from "next";

export type ReminderSeverity = "info" | "warn" | "danger" | "success";

export type UserSummary = {
  id: string;
  name: string;
  employeeNo?: string;
  department?: string;
};

export type Archive = {
  id: string;
  name: string;
  alias?: string;
};

export type Reminder = {
  id: string;
  severity: ReminderSeverity;
  title: string;
  subtitle?: string;
  desc?: string;
  url?: Route;
  // opsional: kalau nanti mau pakai perhitungan hari
  daysLeft?: number;
};

export type DashboardData = {
  user: UserSummary;
  totalDocs: number;
  lastUpdated: string; // ISO string
  archives: Archive[];
  reminders: Reminder[];
};
