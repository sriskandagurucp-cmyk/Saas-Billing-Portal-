/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  SubscriptionPlan,
  Invoice,
  PaymentTransaction,
  TeamMemberInvitation,
  ActivityLog,
  CurrentRoute,
  BillingInterval,
} from '../types';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StateContextType {
  currentRoute: CurrentRoute;
  navigateTo: (route: CurrentRoute) => void;
  currentUser: User | null;
  allUsers: User[];
  plans: SubscriptionPlan[];
  invoices: Invoice[];
  transactions: PaymentTransaction[];
  teamInvitations: TeamMemberInvitation[];
  activityLogs: ActivityLog[];
  billingInterval: BillingInterval;
  setBillingInterval: (interval: BillingInterval) => void;
  toasts: Toast[];
  addToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  showCommandPalette: boolean;
  setShowCommandPalette: (show: boolean) => void;
  logIn: (email: string, role: UserRole, customName?: string) => void;
  logOut: () => void;
  changeUserRole: (userId: string, newRole: UserRole) => void;
  deleteUser: (userId: string) => void;
  createUser: (name: string, email: string, role: UserRole, planId: string) => void;
  inviteTeamMember: (email: string, role: UserRole) => void;
  updateSubscription: (planId: string) => void;
  refundInvoice: (invoiceId: string) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

const PRESET_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_free',
    name: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['Up to 1,000 requests / mo', 'Basic analytical cards', 'Client-side local sandbox', 'Email support only'],
    limitations: ['Role authorization widgets', 'PDF Invoice exporting', 'Unlimited team members', 'Interactive webhook testing'],
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    priceMonthly: 49,
    priceYearly: 468, // $39/mo
    features: ['Up to 100,000 requests / mo', 'Premium glowing graphs', 'Finance analytics dashboard', 'Multi-user role provisioning', 'Priority response SLA (2h)', 'Export to CSV and JSON Ledger'],
    limitations: ['Custom enterprise contracts', 'Dedicated security review'],
    recommended: true,
  },
  {
    id: 'plan_enterprise',
    name: 'Enterprise',
    priceMonthly: 199,
    priceYearly: 1908, // $159/mo
    features: ['Unlimited monthly volume', 'Custom RBAC configurations', 'Premium interactive canvas', 'Tailored team directories', 'Personalized support manager', 'Zero-downtime cluster hosting'],
    limitations: [],
  },
];

const INITIAL_USERS: User[] = [
  {
    id: 'usr_1',
    name: 'Sarah Connor',
    email: 'sarah.c@skygrid.io',
    role: 'Admin',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    planId: 'plan_enterprise',
    joinedDate: '2025-01-10',
  },
  {
    id: 'usr_2',
    name: 'Marcus Wright',
    email: 'marcus.w@skygrid.io',
    role: 'Finance',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    planId: 'plan_pro',
    joinedDate: '2025-02-14',
  },
  {
    id: 'usr_3',
    name: 'John Connor',
    email: 'john.c@skygrid.io',
    role: 'User',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    planId: 'plan_pro',
    joinedDate: '2025-04-03',
  },
  {
    id: 'usr_4',
    name: 'Kate Connor',
    email: 'kate.c@skygrid.io',
    role: 'User',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    planId: 'plan_free',
    joinedDate: '2026-05-20',
  },
  {
    id: 'usr_5',
    name: 'Miles Dyson',
    email: 'miles.d@cyberdyne.org',
    role: 'Finance',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    planId: 'plan_free',
    joinedDate: '2025-11-22',
  },
];

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_1091',
    invoiceNumber: 'INV-2026-1091',
    userId: 'usr_1',
    userName: 'Sarah Connor',
    userEmail: 'sarah.c@skygrid.io',
    planName: 'Enterprise Plan (Yearly)',
    amount: 1908.00,
    status: 'Paid',
    dueDate: '2026-05-15',
    billingDate: '2026-05-01',
    items: [
      { description: 'SkyGrid Enterprise Plan - Unlimited Volume (Yearly Sync)', amount: 1908.00 },
    ],
  },
  {
    id: 'inv_1090',
    invoiceNumber: 'INV-2026-1090',
    userId: 'usr_2',
    userName: 'Marcus Wright',
    userEmail: 'marcus.w@skygrid.io',
    planName: 'Pro Plan (Monthly)',
    amount: 49.00,
    status: 'Paid',
    dueDate: '2026-05-18',
    billingDate: '2026-05-18',
    items: [
      { description: 'Pro License Monthly Seat - 1 Developer Domain', amount: 49.00 },
    ],
  },
  {
    id: 'inv_1089',
    invoiceNumber: 'INV-2026-1089',
    userId: 'usr_3',
    userName: 'John Connor',
    userEmail: 'john.c@skygrid.io',
    planName: 'Pro Plan (Monthly)',
    amount: 49.00,
    status: 'Paid',
    dueDate: '2026-05-10',
    billingDate: '2026-05-10',
    items: [
      { description: 'Pro License Monthly Seat - 1 Developer Domain', amount: 49.00 },
    ],
  },
  {
    id: 'inv_1088',
    invoiceNumber: 'INV-2026-1088',
    userId: 'usr_5',
    userName: 'Miles Dyson',
    userEmail: 'miles.d@cyberdyne.org',
    planName: 'Starter Plan (Monthly Addons)',
    amount: 12.00,
    status: 'Overdue',
    dueDate: '2026-04-20',
    billingDate: '2026-04-05',
    items: [
      { description: 'Storage limit exceeded - Oversage charge', amount: 12.00 },
    ],
  },
  {
    id: 'inv_1087',
    invoiceNumber: 'INV-2026-1087',
    userId: 'usr_3',
    userName: 'John Connor',
    userEmail: 'john.c@skygrid.io',
    planName: 'Pro Plan (Monthly)',
    amount: 49.00,
    status: 'Paid',
    dueDate: '2026-04-10',
    billingDate: '2026-04-10',
    items: [
      { description: 'Pro License Monthly Seat - 1 Developer Domain', amount: 49.00 },
    ],
  },
  {
    id: 'inv_1086',
    invoiceNumber: 'INV-2026-1086',
    userId: 'usr_1',
    userName: 'Sarah Connor',
    userEmail: 'sarah.c@skygrid.io',
    planName: 'Enterprise Setup Support Addon',
    amount: 750.00,
    status: 'Paid',
    dueDate: '2026-03-22',
    billingDate: '2026-03-22',
    items: [
      { description: 'Architecture audit & SSO direct onboarding mapping', amount: 750.00 },
    ],
  },
];

const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx_301',
    invoiceId: 'inv_1091',
    userName: 'Sarah Connor',
    userEmail: 'sarah.c@skygrid.io',
    amount: 1908.00,
    status: 'Success',
    timestamp: '2026-05-01 14:32:10',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: 'tx_300',
    invoiceId: 'inv_1090',
    userName: 'Marcus Wright',
    userEmail: 'marcus.w@skygrid.io',
    amount: 49.00,
    status: 'Success',
    timestamp: '2026-05-18 09:15:33',
    paymentMethod: 'Mastercard •••• 9912',
  },
  {
    id: 'tx_299',
    invoiceId: 'inv_1089',
    userName: 'John Connor',
    userEmail: 'john.c@skygrid.io',
    amount: 49.00,
    status: 'Success',
    timestamp: '2026-05-10 18:22:04',
    paymentMethod: 'Apple Pay',
  },
  {
    id: 'tx_298',
    invoiceId: 'inv_1088',
    userName: 'Miles Dyson',
    userEmail: 'miles.d@cyberdyne.org',
    amount: 12.00,
    status: 'Failed',
    timestamp: '2026-04-21 02:11:59',
    paymentMethod: 'Stripe Direct Debit',
  },
  {
    id: 'tx_297',
    invoiceId: 'inv_1087',
    userName: 'John Connor',
    userEmail: 'john.c@skygrid.io',
    amount: 49.00,
    status: 'Success',
    timestamp: '2026-04-10 11:42:01',
    paymentMethod: 'Apple Pay',
  },
];

const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act_101',
    userId: 'usr_1',
    userName: 'Sarah Connor',
    userRole: 'Admin',
    action: 'Subscription Upgraded',
    timestamp: '2026-05-29 02:44:11',
    details: 'Upgraded team system wide tier to Enterprise Yearly Billing License',
  },
  {
    id: 'act_102',
    userId: 'usr_1',
    userName: 'Sarah Connor',
    userRole: 'Admin',
    action: 'User Invite Sent',
    timestamp: '2026-05-28 17:15:00',
    details: 'Invited Katherine Brewster (katherine.b@skygrid.io) with User clearance role',
  },
  {
    id: 'act_103',
    userId: 'usr_2',
    userName: 'Marcus Wright',
    userRole: 'Finance',
    action: 'Invoices Audited',
    timestamp: '2026-05-28 11:23:45',
    details: 'Downloaded regional sales statement and compiled 5 items into standard ledger format',
  },
  {
    id: 'act_104',
    userId: 'usr_3',
    userName: 'John Connor',
    userRole: 'User',
    action: 'Payment Method Amended',
    timestamp: '2026-05-27 15:59:02',
    details: 'Replaced Visa card with Apple Pay verification protocols',
  },
];

const INITIAL_INVITATIONS: TeamMemberInvitation[] = [
  {
    id: 'inv_v1',
    email: 'katherine.b@skygrid.io',
    role: 'User',
    status: 'Invited',
    invitedAt: '2026-05-28 17:15:00',
  },
  {
    id: 'inv_v2',
    email: 'peter.g@skygrid.io',
    role: 'Finance',
    status: 'Invited',
    invitedAt: '2026-05-26 12:44:19',
  },
  {
    id: 'inv_v3',
    email: 'silas.m@skygrid.io',
    role: 'User',
    status: 'Accepted',
    invitedAt: '2026-05-20 09:30:00',
  },
];

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation / Custom SPA Router
  const [currentRoute, setCurrentRoute] = useState<CurrentRoute>('/');

  // Initialize from LocalStorage or defaults
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const cached = localStorage.getItem('saas_current_user');
    if (cached) return JSON.parse(cached);
    // Standard default logged-in profile: Start with Administrator permissions to show full UI glory
    return INITIAL_USERS[0];
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const cached = localStorage.getItem('saas_all_users');
    return cached ? JSON.parse(cached) : INITIAL_USERS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const cached = localStorage.getItem('saas_invoices');
    return cached ? JSON.parse(cached) : INITIAL_INVOICES;
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const cached = localStorage.getItem('saas_transactions');
    return cached ? JSON.parse(cached) : INITIAL_TRANSACTIONS;
  });

  const [teamInvitations, setTeamInvitations] = useState<TeamMemberInvitation[]>(() => {
    const cached = localStorage.getItem('saas_team_invitations');
    return cached ? JSON.parse(cached) : INITIAL_INVITATIONS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const cached = localStorage.getItem('saas_activity_logs');
    return cached ? JSON.parse(cached) : INITIAL_ACTIVITY_LOGS;
  });

  const [billingInterval, setBillingInterval] = useState<BillingInterval>('monthly');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Active User role switcher sync helper
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    return currentUser ? currentUser.role : 'Admin';
  });

  // Handle popstate for browser back & forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as CurrentRoute;
      const validRoutes: CurrentRoute[] = [
        '/', '/login', '/register', '/dashboard', '/dashboard/admin',
        '/dashboard/finance', '/pricing', '/billing', '/settings', '/invoices'
      ];
      if (validRoutes.includes(path)) {
        setCurrentRoute(path);
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Read route on page load. To prevent issues, map pathname directly
    const path = window.location.pathname as CurrentRoute;
    const validRoutes: CurrentRoute[] = [
      '/', '/login', '/register', '/dashboard', '/dashboard/admin',
      '/dashboard/finance', '/pricing', '/billing', '/settings', '/invoices'
    ];
    if (validRoutes.includes(path)) {
      setCurrentRoute(path);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync back to local storage on state alterations
  useEffect(() => {
    localStorage.setItem('saas_current_user', JSON.stringify(currentUser));
    if (currentUser) {
      setActiveRole(currentUser.role);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('saas_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('saas_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('saas_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('saas_team_invitations', JSON.stringify(teamInvitations));
  }, [teamInvitations]);

  useEffect(() => {
    localStorage.setItem('saas_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Navigate utility
  const navigateTo = (route: CurrentRoute) => {
    setCurrentRoute(route);
    window.history.pushState(null, '', route);
    // Smooth scroll top on navigations
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Toast notifier
  const addToast = (title: string, message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    
    // Auto purge in 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Session Authentication Helpers
  const logIn = (email: string, role: UserRole, customName?: string) => {
    // Check if user exists, else spin up profile
    const existing = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      const refreshed: User = { ...existing, role }; // Allow shifting role parameter directly in login dashboard
      setCurrentUser(refreshed);
      // Also update in directory
      setAllUsers((prev) => prev.map((u) => u.id === refreshed.id ? refreshed : u));
    } else {
      const newUser: User = {
        id: `usr_${Math.random().toString(36).substring(2, 7)}`,
        name: customName || email.split('@')[0].toUpperCase(),
        email: email,
        role: role,
        status: 'Active',
        planId: 'plan_pro',
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setAllUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
    }

    addToast('Authentication Verified', `Logged in as ${customName || email} with clear role: ${role}`, 'success');
    
    // Clear back to main system dashboard or custom sub dashboards
    if (role === 'Admin') navigateTo('/dashboard/admin');
    else if (role === 'Finance') navigateTo('/dashboard/finance');
    else navigateTo('/dashboard');
  };

  const logOut = () => {
    setCurrentUser(null);
    addToast('Successfully Disconnected', 'Logged out of current security parameters.', 'info');
    navigateTo('/');
  };

  // Demo active role switcher sync back helper
  useEffect(() => {
    if (currentUser && currentUser.role !== activeRole) {
      const updated: User = { ...currentUser, role: activeRole };
      setCurrentUser(updated);
      setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
      
      // Log event
      const log: ActivityLog = {
        id: `act_${Math.random().toString(36).substring(2, 7)}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: activeRole,
        action: 'Role Switched (Sandbox Demo)',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        details: `Simulated a secure shift in authorization clearance to: ${activeRole}`,
      };
      setActivityLogs((prev) => [log, ...prev]);
      
      addToast('Security Access Changed', `Role set to ${activeRole} for dynamic testing panel.`, 'info');
    }
  }, [activeRole]);

  // Admin capabilities
  const changeUserRole = (userId: string, newRole: UserRole) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    
    // If it is the current logged-in user, refresh their active context
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => prev ? { ...prev, role: newRole } : null);
    }

    // Log the event
    const executorName = currentUser?.name || 'System Admin';
    const log: ActivityLog = {
      id: `act_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser?.id || 'system',
      userName: executorName,
      userRole: currentUser?.role || 'Admin',
      action: 'User Role Amended',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Amended user role for target ${userId} set to clearance: ${newRole}`,
    };
    setActivityLogs((prev) => [log, ...prev]);
    addToast('Security Policy Updated', `Target profile switched to ${newRole}.`, 'success');
  };

  const deleteUser = (userId: string) => {
    const target = allUsers.find((u) => u.id === userId);
    if (!target) return;

    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
    
    // Log the event
    const log: ActivityLog = {
      id: `act_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser?.id || 'system',
      userName: currentUser?.name || 'Admin',
      userRole: currentUser?.role || 'Admin',
      action: 'Account Deletion Secure Purge',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Purged target profile credential for ${target.name} (${target.email})`,
    };
    setActivityLogs((prev) => [log, ...prev]);
    addToast('Account Permanently Deleted', `Successfully purged ${target.name} directory record.`, 'success');
  };

  const createUser = (name: string, email: string, role: UserRole, planId: string) => {
    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      role,
      status: 'Active',
      planId,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setAllUsers((prev) => [newUser, ...prev]);

    // Log the event
    const log: ActivityLog = {
      id: `act_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser?.id || 'system',
      userName: currentUser?.name || 'Admin',
      userRole: currentUser?.role || 'Admin',
      action: 'Account Manually Provisioned',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Provisioned credentials for ${name} (${email}) with plan: ${planId}`,
    };
    setActivityLogs((prev) => [log, ...prev]);
    addToast('Profile Configured', `Created directory record for ${name} under ${role}.`, 'success');
  };

  const inviteTeamMember = (email: string, role: UserRole) => {
    const isAlrInvited = teamInvitations.some((inv) => inv.email.toLowerCase() === email.toLowerCase());
    if (isAlrInvited) {
      addToast('Invitation Duplicate', `${email} was currently invited already.`, 'error');
      return;
    }

    const newInv: TeamMemberInvitation = {
      id: `inv_${Math.random().toString(36).substring(2, 7)}`,
      email,
      role,
      status: 'Invited',
      invitedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };
    setTeamInvitations((prev) => [newInv, ...prev]);

    // Log the event
    const log: ActivityLog = {
      id: `act_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser?.id || 'system',
      userName: currentUser?.name || 'Admin',
      userRole: currentUser?.role || 'Admin',
      action: 'Workspace Invitation Dispatched',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Dispatched standard workspace authentication token invitation to ${email}`,
    };
    setActivityLogs((prev) => [log, ...prev]);
    addToast('Invitation Sent', `${email} invited to team directory as ${role}`, 'success');
  };

  // Subscription updation billing capabilities
  const updateSubscription = (planId: string) => {
    if (!currentUser) {
      addToast('Authentication Required', 'Please log in to finalize subscription options.', 'error');
      navigateTo('/login');
      return;
    }

    const selectedPlan = PRESET_PLANS.find((p) => p.id === planId);
    if (!selectedPlan) return;

    const amount = billingInterval === 'monthly' ? selectedPlan.priceMonthly : selectedPlan.priceYearly;

    // Check if it's downgrading or upgrading
    const currentPlan = PRESET_PLANS.find((p) => p.id === currentUser.planId) || PRESET_PLANS[0];
    const isUpgrade = selectedPlan.priceMonthly > currentPlan.priceMonthly;

    // Build invoice record
    const invoiceNum = `INV-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    const invoiceId = `inv_${Math.random().toString(36).substring(2, 7)}`;
    const billDate = new Date().toISOString().split('T')[0];
    
    const newInvoice: Invoice = {
      id: invoiceId,
      invoiceNumber: invoiceNum,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      planName: `${selectedPlan.name} Plan (${billingInterval === 'monthly' ? 'Monthly' : 'Yearly'})`,
      amount,
      status: amount === 0 ? 'Paid' : 'Paid', // Pre-confirm paid in sandbox
      dueDate: billDate,
      billingDate: billDate,
      items: [
        {
          description: `SkyGrid Cloud Solutions - ${selectedPlan.name} Subscription Licensing fee (${billingInterval === 'monthly' ? 'Monthly Sync Rate' : 'Annual Discount Package'})`,
          amount,
        },
      ],
    };

    // Card transaction record
    const newTx: PaymentTransaction = {
      id: `tx_${Math.floor(Math.random() * 900) + 100}`,
      invoiceId,
      userName: currentUser.name,
      userEmail: currentUser.email,
      amount,
      status: 'Success',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      paymentMethod: 'Visa •••• 1337',
    };

    // Upgrade current user
    const updatedUser: User = { ...currentUser, planId };
    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));

    // Insert invoice & transactions logs
    setInvoices((prev) => [newInvoice, ...prev]);
    if (amount > 0) {
      setTransactions((prev) => [newTx, ...prev]);
    }

    // Log tracking
    const log: ActivityLog = {
      id: `act_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: isUpgrade ? 'Plan Tier Upgraded' : 'Plan Tier Downgraded',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `${isUpgrade ? 'Upgraded' : 'Downgraded'} plan from ${currentPlan.name} to ${selectedPlan.name}. Allocated bill: $${amount}.`,
    };
    setActivityLogs((prev) => [log, ...prev]);

    addToast(
      isUpgrade ? 'Tier Upgraded Successfully!' : 'Tier Adjusted Successfully',
      `Active layout switched to ${selectedPlan.name}. Digital receipt ${invoiceNum} generated.`,
      'success'
    );
  };

  // Finance refund
  const refundInvoice = (invoiceId: string) => {
    const target = invoices.find((inv) => inv.id === invoiceId);
    if (!target) return;

    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Overdue' } : inv))
    );

    // Add activity log
    const log: ActivityLog = {
      id: `act_${Math.random().toString(36).substring(2, 7)}`,
      userId: currentUser?.id || 'finance',
      userName: currentUser?.name || 'Finance Audits',
      userRole: currentUser?.role || 'Finance',
      action: 'Invoice Revoked/Refunded',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details: `Discharged credit settings. Declared audit refund / overdue state for receipt: ${target.invoiceNumber}`,
    };
    setActivityLogs((prev) => [log, ...prev]);
    addToast('Audit Entry Set', `Marked ${target.invoiceNumber} invoice ledger as pending discharge.`, 'info');
  };

  return (
    <StateContext.Provider
      value={{
        currentRoute,
        navigateTo,
        currentUser,
        allUsers,
        plans: PRESET_PLANS,
        invoices,
        transactions,
        teamInvitations,
        activityLogs,
        billingInterval,
        setBillingInterval,
        toasts,
        addToast,
        removeToast,
        showCommandPalette,
        setShowCommandPalette,
        logIn,
        logOut,
        changeUserRole,
        deleteUser,
        createUser,
        inviteTeamMember,
        updateSubscription,
        refundInvoice,
        activeRole,
        setActiveRole,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be declared under a StateProvider');
  }
  return context;
};
