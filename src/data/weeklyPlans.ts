import { WeeklyPlan } from '../types';
import { format, startOfWeek, addWeeks, endOfWeek } from 'date-fns';

// Calculate 12-week plan starting from the Monday of this week
const getWeeklyPlanDates = () => {
  const today = new Date();
  const mondayThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday as start of week
  
  const weeks: WeeklyPlan[] = [];
  
  const focusTopics = [
    'Setting Foundation & Getting Started',
    'Building Momentum', 
    'Establishing Daily Rhythms',
    'First Month Review & Adjustment',
    'Deepening Commitment',
    'Mid-Point Momentum',
    'Overcoming Challenges',
    'Two-Thirds Milestone',
    'Accelerating Progress',
    'Final Push Preparation',
    'Sprint to Finish',
    'Completion & Celebration'
  ];
  
  for (let i = 0; i < 12; i++) {
    const weekStart = addWeeks(mondayThisWeek, i);
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    
    weeks.push({
      id: `week-${i + 1}`,
      weekNumber: i + 1,
      startDate: format(weekStart, 'yyyy-MM-dd'),
      endDate: format(weekEnd, 'yyyy-MM-dd'),
      focus: focusTopics[i],
      wins: [],
      lessons: [],
      tasks: [],
      owner: 'both',
    });
  }
  
  return weeks;
};

export const initialWeeklyPlans: WeeklyPlan[] = getWeeklyPlanDates();