/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'Admin' | 'Finance' | 'User';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar?: string;
  planId: string;
  joinedDate: string;
}

export type BillingInterval = 'monthly' | 'yearly';

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  limitations: string[];
  stripeId?: string;
  recommended?: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  planName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  billingDate: string;
  items: { description: string; amount: number }[];
}

export interface PaymentTransaction {
  id: string;
  invoiceId: string;
  userName: string;
  userEmail: string;
  amount: number;
  status: 'Success' | 'Processing' | 'Failed';
  timestamp: string;
  paymentMethod: string;
}

export interface TeamMemberInvitation {
  id: string;
  email: string;
  role: UserRole;
  status: 'Invited' | 'Accepted';
  invitedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  timestamp: string;
  details: string;
}

export type ActiveTab = 'overview' | 'analytics' | 'users' | 'subscriptions' | 'settings';

export type CurrentRoute =
  | '/'
  | '/login'
  | '/register'
  | '/dashboard'
  | '/dashboard/admin'
  | '/dashboard/finance'
  | '/pricing'
  | '/billing'
  | '/settings'
  | '/invoices';
