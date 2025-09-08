import React from 'react';
import useSupabaseStore from '../store/supabaseStore';

const SyncStatus: React.FC = () => {
  const isOnline = useSupabaseStore((state) => state.isOnline);
  const lastSync = useSupabaseStore((state) => state.lastSync);
  const syncError = useSupabaseStore((state) => state.syncError);
  const syncData = useSupabaseStore((state) => state.syncData);

  const formatLastSync = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex items-center space-x-3 text-sm">
      {/* Online Status */}
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-gray-600">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Sync Status */}
      {isOnline && (
        <>
          <span className="text-gray-300">•</span>
          <div className="flex items-center space-x-1">
            {syncError ? (
              <span className="text-red-600">Sync error</span>
            ) : (
              <span className="text-gray-600">
                Synced {formatLastSync(lastSync)}
              </span>
            )}
          </div>
        </>
      )}

      {/* Manual Sync Button */}
      {isOnline && (
        <>
          <span className="text-gray-300">•</span>
          <button
            onClick={syncData}
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
            title="Sync now"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Sync</span>
          </button>
        </>
      )}
    </div>
  );
};

export default SyncStatus;