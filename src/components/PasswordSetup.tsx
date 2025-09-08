import React, { useState } from 'react';
import useSupabaseStore from '../store/supabaseStore';

const PasswordSetup: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const currentUser = useSupabaseStore((state) => state.currentUser);
  const updatePassword = useSupabaseStore((state) => state.updatePassword);

  const validateNewPassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate new password
    if (!validateNewPassword(newPassword)) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character'
      });
      return;
    }

    // Check passwords match
    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }

    // Update password
    const success = updatePassword(currentPassword, newPassword);
    
    if (success) {
      setMessage({
        type: 'success',
        text: 'Password updated successfully! Please remember your new password.'
      });
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setMessage({
        type: 'error',
        text: 'Current password is incorrect'
      });
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Change Password</h3>
      <p className="text-sm text-gray-600 mb-4">
        Set a secure password for {currentUser}'s account
      </p>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              id="current-password"
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input pr-12"
              placeholder="Enter current password"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Default: {currentUser === 'Daniel' ? 'ChangeMe2025!D' : 'ChangeMe2025!Y'}
          </p>
        </div>

        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            id="new-password"
            type={showPasswords ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            id="confirm-password"
            type={showPasswords ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="Confirm new password"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            id="show-passwords"
            type="checkbox"
            checked={showPasswords}
            onChange={(e) => setShowPasswords(e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
          />
          <label htmlFor="show-passwords" className="ml-2 text-sm text-gray-700">
            Show passwords
          </label>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="text-xs font-medium text-blue-800 mb-1">Password Requirements:</h4>
          <ul className="text-xs text-blue-600 space-y-0.5">
            <li>• At least 8 characters</li>
            <li>• 1 uppercase letter (A-Z)</li>
            <li>• 1 number (0-9)</li>
            <li>• 1 special character (@$!%*?&)</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordSetup;