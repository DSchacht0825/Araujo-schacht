import React from 'react';
import useReminders from '../hooks/useReminders';

const ReminderWidget: React.FC = () => {
  const { getReminders } = useReminders();
  const reminders = getReminders();

  if (reminders.length === 0) return null;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysText = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-sm z-40">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Upcoming Reminders</h3>
          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
            {reminders.length} items
          </span>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {reminders.slice(0, 5).map((reminder, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg border ${getUrgencyColor(reminder.urgency)}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium">{reminder.title}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {reminder.type === 'task' ? '📝' : '🎯'} {getDaysText(reminder.daysUntil)}
                  </p>
                </div>
                <span className="text-xs font-medium">{reminder.dueDate}</span>
              </div>
            </div>
          ))}
        </div>

        {reminders.length > 5 && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            +{reminders.length - 5} more reminders
          </p>
        )}
      </div>
    </div>
  );
};

export default ReminderWidget;