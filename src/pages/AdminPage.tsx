/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAppState } from '../context/StateContext';
import {
  Users,
  Search,
  UserPlus,
  Shield,
  Trash2,
  CheckCircle,
  Database,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react';
import { UserRole } from '../types';

export const AdminPage: React.FC = () => {
  const {
    allUsers,
    plans,
    changeUserRole,
    deleteUser,
    createUser,
    addToast,
    activityLogs,
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');
  
  // State for account provisioning form
  const [showAddModal, setShowAddModal] = useState(false);
  const [pName, setPName] = useState('');
  const [pEmail, setPEmail] = useState('');
  const [pRole, setPRole] = useState<UserRole>('User');
  const [pPlan, setPPlan] = useState('plan_pro');

  // Submit provisioning form
  const handleProvision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pEmail) {
      addToast('Validation Failed', 'Name and Email fields are required specs.', 'error');
      return;
    }

    createUser(pName, pEmail, pRole, pPlan);
    
    // Reset state
    setPName('');
    setPEmail('');
    setPRole('User');
    setPPlan('plan_pro');
    setShowAddModal(false);
  };

  // Filter records
  const filteredUsers = allUsers.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query);

    const matchesFilter = filterRole === 'All' || user.role === filterRole;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="h-5.5 w-5.5 text-indigo-400" />
            <span>Authorization Security Directory</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Audit system directories, provision new account nodes, adjust security policies, and manage subscription clearance parameters.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-indigo-600/15"
        >
          <UserPlus className="h-4 w-4" />
          <span>Provision New Account</span>
        </button>
      </div>

      {/* Filters and Search utilities */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between bg-gray-900/10 p-4 rounded-xl border border-gray-900 bg-gray-950/20 backdrop-blur-md">
        
        {/* Search Input bar */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search matching profiles, emails, node IDs..."
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-xs text-gray-300 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Roles Filter Switches */}
        <div className="flex items-center gap-1.5 bg-gray-900/60 border border-gray-800 p-1 rounded-lg self-start">
          {['All', 'Admin', 'Finance', 'User'].map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                filterRole === role
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Accounts Directory Table Grid */}
      <div className="overflow-hidden rounded-2xl border border-gray-850 bg-gray-950/40 backdrop-blur-xl shadow-lg shadow-black/8 w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-xs text-left text-gray-400 border-collapse table-auto">
            <thead>
              <tr className="bg-gray-950 bg-opacity-70 text-[9px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-900/40">
                <th className="px-6 py-3.5">Active Tenant Profile Details</th>
                <th className="px-6 py-3.5">System Identifiers</th>
                <th className="px-6 py-3.5">Access Role Clearance</th>
                <th className="px-6 py-3.5">License Tier Package</th>
                <th className="px-6 py-3.5 text-right">Directory Controls</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-900/60">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const matchingPlan = plans.find((p) => p.id === user.planId) || plans[0];
                  
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-900/15 transition-colors font-sans"
                    >
                      {/* Avatar Details */}
                      <td className="px-6 py-4.5 whitespace-nowrap min-w-[200px]">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-9 w-9 rounded-full object-cover border border-indigo-500/10"
                            />
                          ) : (
                            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold font-mono">
                              {user.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-200">{user.name}</p>
                            <p className="text-[10px] text-gray-500 font-mono mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Identifiers */}
                      <td className="px-6 py-4.5 whitespace-nowrap font-mono text-[10px] text-gray-500">
                        <div>
                          <p className="text-gray-400">{user.id}</p>
                          <p className="text-[9px] text-gray-600 mt-0.5">Joined: {user.joinedDate}</p>
                        </div>
                      </td>

                      {/* Access Controls Role selector */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <select
                          className={`px-3 py-1 rounded-lg border text-[10px] font-bold bg-gray-950 pr-8 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                            user.role === 'Admin'
                              ? 'border-indigo-800 text-indigo-400'
                              : user.role === 'Finance'
                              ? 'border-amber-800 text-amber-400'
                              : 'border-emerald-800 text-emerald-400'
                          }`}
                          value={user.role}
                          onChange={(e) => changeUserRole(user.id, e.target.value as UserRole)}
                          title="Change clearance role dynamically"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Finance">Finance</option>
                          <option value="User">User</option>
                        </select>
                      </td>

                      {/* Package plan mapping badge */}
                      <td className="px-6 py-4.5 whitespace-nowrap font-medium">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-gray-900 border border-gray-850 ${
                          matchingPlan.id === 'plan_enterprise' ? 'text-indigo-400' : matchingPlan.id === 'plan_pro' ? 'text-violet-400' : 'text-gray-500'
                        }`}>
                          {matchingPlan.name}
                        </span>
                      </td>

                      {/* Directory actions */}
                      <td className="px-6 py-4.5 whitespace-nowrap text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Purge profile details for ${user.name}? This parameter correction is secure and persistent.`)) {
                              deleteUser(user.id);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-gray-850 bg-gray-900 text-gray-500 hover:text-rose-400 hover:border-rose-950 hover:bg-rose-500/5 transition-all text-xs cursor-pointer inline-flex items-center"
                          title="Delete profile node"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-gray-500 font-sans">
                    No active accounts matching directory selectors. Try query adjustments.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Provisioning Modal Overlay popup */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowAddModal(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          <div className="relative max-w-md w-full rounded-2xl border border-gray-800 bg-gray-950 p-6 shadow-2xl z-10 text-gray-300">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-1.5 leading-none mb-1">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Provision User Directory</span>
            </h3>
            <p className="text-xs text-gray-500 mb-6">Create fully verified, credentials simulated profiles instantly on our billing system.</p>

            <form onSubmit={handleProvision} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider leading-none">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Sarah J. Connor"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider leading-none">Email Profile Address</label>
                <input
                  type="email"
                  required
                  placeholder="sconnor@resistance.net"
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                  value={pEmail}
                  onChange={(e) => setPEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider leading-none">Access Role</label>
                  <select
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-850 rounded-xl text-gray-300 focus:border-indigo-500 focus:outline-none"
                    value={pRole}
                    onChange={(e) => setPRole(e.target.value as UserRole)}
                  >
                    <option value="User">User</option>
                    <option value="Finance">Finance</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider leading-none">Licensing Plan</label>
                  <select
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-850 rounded-xl text-gray-300 focus:border-indigo-500 focus:outline-none"
                    value={pPlan}
                    onChange={(e) => setPPlan(e.target.value)}
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-1.5 rounded-xl border border-gray-800 bg-gray-900 hover:bg-gray-850 text-gray-400 hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                >
                  Provision Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
