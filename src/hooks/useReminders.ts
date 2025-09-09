import { useEffect } from 'react';
import useStore from '../store';
import { format, isToday, isTomorrow, differenceInDays } from 'date-fns';

const useReminders = () => {
  const tasks = useStore((state) => state.tasks);
  const goals = useStore((state) => state.goals);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    if (!currentUser) return;

    // Check for upcoming tasks
    const upcomingTasks = tasks.filter(task => {
      if (task.completed) return false;
      if (task.owner !== currentUser && task.owner !== 'both') return false;
      
      const dueDate = new Date(task.dueDate);
      const daysUntilDue = differenceInDays(dueDate, new Date());
      
      return daysUntilDue <= 3 && daysUntilDue >= 0;
    });

    // Check for upcoming goal deadlines
    const upcomingGoals = goals.filter(goal => {
      if (goal.completed) return false;
      if (goal.owner !== currentUser && goal.owner !== 'both') return false;
      
      const targetDate = new Date(goal.targetDate);
      const daysUntilTarget = differenceInDays(targetDate, new Date());
      
      return daysUntilTarget <= 7 && daysUntilTarget >= 0;
    });

    // Request notification permission if needed
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Send notifications for urgent items
    if ('Notification' in window && Notification.permission === 'granted') {
      upcomingTasks.forEach(task => {
        const dueDate = new Date(task.dueDate);
        if (isToday(dueDate)) {
          new Notification('Task Due Today!', {
            body: `"${task.title}" is due today`,
            icon: '/favicon.ico'
          });
        } else if (isTomorrow(dueDate)) {
          new Notification('Task Due Tomorrow', {
            body: `"${task.title}" is due tomorrow`,
            icon: '/favicon.ico'
          });
        }
      });

      upcomingGoals.forEach(goal => {
        const targetDate = new Date(goal.targetDate);
        const daysUntil = differenceInDays(targetDate, new Date());
        if (daysUntil <= 3) {
          new Notification('Goal Deadline Approaching!', {
            body: `"${goal.title}" is due in ${daysUntil} days`,
            icon: '/favicon.ico'
          });
        }
      });
    }
  }, [tasks, goals, currentUser]);

  const getReminders = () => {
    if (!currentUser) return [];

    const reminders: Array<{
      type: 'task' | 'goal';
      title: string;
      dueDate: string;
      urgency: 'high' | 'medium' | 'low';
      daysUntil: number;
    }> = [];

    // Add task reminders
    tasks.forEach(task => {
      if (task.completed) return;
      if (task.owner !== currentUser && task.owner !== 'both') return;
      
      const dueDate = new Date(task.dueDate);
      const daysUntil = differenceInDays(dueDate, new Date());
      
      if (daysUntil <= 7 && daysUntil >= 0) {
        reminders.push({
          type: 'task',
          title: task.title,
          dueDate: format(dueDate, 'MMM d'),
          urgency: daysUntil === 0 ? 'high' : daysUntil <= 2 ? 'medium' : 'low',
          daysUntil
        });
      }
    });

    // Add goal reminders
    goals.forEach(goal => {
      if (goal.completed) return;
      if (goal.owner !== currentUser && goal.owner !== 'both') return;
      
      const targetDate = new Date(goal.targetDate);
      const daysUntil = differenceInDays(targetDate, new Date());
      
      if (daysUntil <= 14 && daysUntil >= 0) {
        reminders.push({
          type: 'goal',
          title: goal.title,
          dueDate: format(targetDate, 'MMM d'),
          urgency: daysUntil <= 3 ? 'high' : daysUntil <= 7 ? 'medium' : 'low',
          daysUntil
        });
      }
    });

    return reminders.sort((a, b) => a.daysUntil - b.daysUntil);
  };

  return { getReminders };
};

export default useReminders;