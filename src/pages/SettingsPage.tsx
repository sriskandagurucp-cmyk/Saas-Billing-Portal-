/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/StateContext';
import {
  Settings,
  User,
  Users,
  Mail,
  Send,
  CheckCircle,
  HelpCircle,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { UserRole } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    currentUser,
    teamInvitations,
    inviteTeamMember,
    addToast,
    logIn,
  } = useAppState();

  const [profileName, setProfileName] = useState(currentUser?.name || 'Sarah Connor');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || 'sarah.c@skygrid.io');

  // Invitation Form States
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('User');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      logIn(profileEmail, currentUser.role, profileName);
      addToast('Profile Details Reconciled', 'Overwrote personal directory details on current session cache.', 'success');
    }
  };

  const handleInviteDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) {
      addToast('Invalid Recipient Spec', 'Email must be defined prior to dispatch.', 'error');
      return;
    }
    inviteTeamMember(inviteEmail, inviteRole);
    setInviteEmail('');
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="h-5.5 w-5.5 text-indigo-400" />
          <span>Workspace Preferences</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Customize active identity parameters and invite coworkers to manage subscription profiles under compliance rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Profile metadata editing */}
        <div className="lg:col-span-6 p-5 rounded-2xl border border-gray-800 bg-gray-950/40 backdrop-blur-md shadow-lg">
          <span className="text-xs font-bold text-gray-200 uppercase tracking-widest pb-3.5 border-b border-gray-900 mb-6 block leading-none">
            Identity Configuration
          </span>

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1 leading-none">Profile User Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1 leading-none">Profile Contact Email</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1 leading-none">Clearance Privilege Authorization</label>
              <input
                type="text"
                disabled
                className="w-full px-3 py-2 bg-gray-900/60 border border-gray-900 text-gray-500 font-bold tracking-widest uppercase cursor-not-allowed text-[10px] rounded-lg"
                value={`${currentUser?.role || 'User'} level`}
              />
              <p className="text-[10px] text-gray-600 mt-1.5 px-1 leading-normal">
                Clearance structures are tied dynamically to sandbox roles. Toggle sandbox profiles above to shift priorities.
              </p>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors pt-2.5"
            >
              Update Session Info
            </button>
          </form>
        </div>

        {/* Right column: Dynamic team workspace invites */}
        <div className="lg:col-span-6 p-5 rounded-2xl border border-gray-800 bg-gray-950/40 backdrop-blur-md shadow-lg space-y-6">
          
          <div>
            <span className="text-xs font-bold text-gray-200 uppercase tracking-widest pb-3.5 border-b border-gray-900 mb-6 block leading-none flex items-center gap-1.5">
              <Users className="h-4 w-4 text-indigo-400" /> Workspace Team Invitations
            </span>

            {/* Invite Dispatch form */}
            <form onSubmit={handleInviteDispatch} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1 leading-none">Coworker Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. jbrewster@skygrid.io"
                      className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-200 focus:outline-none placeholder-gray-500"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 px-1 leading-none">Security Access Role</label>
                  <select
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-850 rounded-xl text-gray-300 focus:outline-none"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as UserRole)}
                  >
                    <option value="User">User</option>
                    <option value="Finance">Finance</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-400 text-xs font-semibold cursor-pointer transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Dispatch Invite Token</span>
              </button>
            </form>
          </div>

          <div className="h-px bg-gray-900" />

          {/* Active invites directories list */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3 block px-1">Active Invitations Directory</p>
            
            <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
              {teamInvitations.length > 0 ? (
                teamInvitations.map((inv) => (
                  <div key={inv.id} className="p-3 bg-gray-950/80 border border-gray-900 rounded-xl flex items-center justify-between text-xs font-sans">
                    <div>
                      <p className="font-semibold text-gray-200 leading-none">{inv.email}</p>
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] text-gray-500 mt-1 leading-none uppercase">
                        Role: <span className="text-gray-400 font-bold">{inv.role}</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        inv.status === 'Accepted'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                      }`}>
                        {inv.status === 'Accepted' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-center text-gray-600 py-4 font-sans">No workspace invitation records recorded inside directories.</p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
