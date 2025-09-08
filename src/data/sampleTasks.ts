import { Task } from '../types';
import { format, addDays, startOfWeek } from 'date-fns';

// Generate sample tasks with dynamic dates
const generateSampleTasks = (): Task[] => {
  const today = new Date();
  const mondayThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  
  return [
    // Week 1 Tasks
    {
      id: 'task-1',
      title: 'Set up daily meditation space',
      completed: false,
      owner: 'Yvonne',
      dueDate: format(addDays(mondayThisWeek, 2), 'yyyy-MM-dd'), // Wednesday
      priority: 'high',
      goalId: 'yvonne-1',
    },
    {
      id: 'task-2',
      title: 'Research gym membership options',
      completed: false,
      owner: 'Daniel',
      dueDate: format(addDays(mondayThisWeek, 4), 'yyyy-MM-dd'), // Friday
      priority: 'high',
      goalId: 'daniel-1',
    },
    {
      id: 'task-3',
      title: 'Schedule weekly date night',
      completed: false,
      owner: 'both',
      dueDate: format(addDays(mondayThisWeek, 6), 'yyyy-MM-dd'), // Sunday
      priority: 'medium',
      goalId: 'family-3',
    },
    {
      id: 'task-4',
      title: 'Calculate monthly expenses for emergency fund',
      completed: false,
      owner: 'both',
      dueDate: format(addDays(mondayThisWeek, 7), 'yyyy-MM-dd'), // Next Monday
      priority: 'high',
      goalId: 'family-2',
    },
    {
      id: 'task-5',
      title: 'Organize photo archives for portfolio',
      completed: false,
      owner: 'Daniel',
      dueDate: format(addDays(mondayThisWeek, 5), 'yyyy-MM-dd'), // Saturday
      priority: 'medium',
      goalId: 'daniel-2',
    },
    {
      id: 'task-6',
      title: 'Research vacation destinations',
      completed: false,
      owner: 'both',
      dueDate: format(addDays(mondayThisWeek, 12), 'yyyy-MM-dd'), // Next Friday
      priority: 'low',
      goalId: 'family-1',
    },
    {
      id: 'task-7',
      title: 'Review course materials for certification',
      completed: false,
      owner: 'Yvonne',
      dueDate: format(addDays(mondayThisWeek, 3), 'yyyy-MM-dd'), // Thursday
      priority: 'high',
      goalId: 'yvonne-2',
    },
    {
      id: 'task-8',
      title: 'Plan healthy meal prep for the week',
      completed: false,
      owner: 'both',
      dueDate: format(addDays(mondayThisWeek, 1), 'yyyy-MM-dd'), // Tuesday
      priority: 'medium',
    },
    {
      id: 'task-9',
      title: 'Set up shared calendar for family activities',
      completed: false,
      owner: 'both',
      dueDate: format(mondayThisWeek, 'yyyy-MM-dd'), // Today (Monday)
      priority: 'medium',
    },
    {
      id: 'task-10',
      title: 'Download meditation app and create account',
      completed: false,
      owner: 'Yvonne',
      dueDate: format(addDays(mondayThisWeek, 1), 'yyyy-MM-dd'), // Tuesday
      priority: 'high',
      goalId: 'yvonne-1',
    },
  ];
};

export const sampleTasks: Task[] = generateSampleTasks();