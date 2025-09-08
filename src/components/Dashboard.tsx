import React, { useState } from 'react';
import useSupabaseStore from '../store/supabaseStore';
import WeeklyView from './WeeklyView';
import GoalsView from './GoalsView';
import DailyRhythm from './DailyRhythm';
import VisionBoard from './VisionBoard';
import YearReview from './YearReview';
import ReminderWidget from './ReminderWidget';
import PasswordSetup from './PasswordSetup';
import SyncStatus from './SyncStatus';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'goals' | 'daily' | 'vision' | 'review' | 'settings'>('weekly');
  const currentUser = useSupabaseStore((state) => state.currentUser);
  const logout = useSupabaseStore((state) => state.logout);

  const tabs = [
    { id: 'weekly', label: 'Weekly Plan', icon: '📅' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'daily', label: 'Daily Rhythm', icon: '☀️' },
    { id: 'vision', label: 'Vision Board', icon: '🌟' },
    { id: 'review', label: 'Year Review', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">
                Araujo-Schacht Belonging & Becoming
              </h1>
              <p className="text-sm text-gray-600 mt-1">12-Week Achievement System</p>
            </div>
            <div className="flex items-center space-x-6">
              <SyncStatus />
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Welcome, {currentUser}!
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Switch User
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  py-3 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'weekly' && <WeeklyView />}
        {activeTab === 'goals' && <GoalsView />}
        {activeTab === 'daily' && <DailyRhythm />}
        {activeTab === 'vision' && <VisionBoard />}
        {activeTab === 'review' && <YearReview />}
        {activeTab === 'settings' && <PasswordSetup />}
      </main>

      {/* Reminder Widget */}
      <ReminderWidget />
    </div>
  );
};

export default Dashboard;