import { Goal } from '../types';
import { format, addWeeks, startOfWeek } from 'date-fns';

// Generate sample goals with dynamic dates
const generateSampleGoals = (): Goal[] => {
  const today = new Date();
  const mondayThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const week12End = addWeeks(mondayThisWeek, 11);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const targetDate = format(week12End, 'yyyy-MM-dd');
  const createdAt = yesterday.toISOString();
  const updatedAt = yesterday.toISOString();

  return [
  // Daniel's Goals
  {
    id: 'daniel-1',
    title: 'Complete 12-Week Fitness Program',
    description: 'Build consistent exercise habits and improve overall health and strength',
    category: 'health',
    owner: 'Daniel',
    targetDate,
    completed: false,
    progress: 0,
    milestones: [
      { id: 'm1', title: 'Week 2: Establish 3x/week routine', completed: false, dueDate: '2025-09-21' },
      { id: 'm2', title: 'Week 4: Complete fitness assessment', completed: false, dueDate: '2025-10-05' },
      { id: 'm3', title: 'Week 8: Mid-program evaluation', completed: false, dueDate: '2025-11-02' },
      { id: 'm4', title: 'Week 12: Final assessment & celebration', completed: false, dueDate: '2025-11-30' },
    ],
    createdAt,
    updatedAt,
  },
  {
    id: 'daniel-2',
    title: 'Launch New Photography Portfolio',
    description: 'Create and launch a professional photography website showcasing latest work',
    category: 'career',
    owner: 'Daniel',
    targetDate: format(addWeeks(mondayThisWeek, 10), 'yyyy-MM-dd'),
    completed: false,
    progress: 10,
    milestones: [
      { id: 'm5', title: 'Select and edit 50 best photos', completed: false, dueDate: '2025-10-01' },
      { id: 'm6', title: 'Design website layout', completed: false, dueDate: '2025-10-15' },
      { id: 'm7', title: 'Write portfolio descriptions', completed: false, dueDate: '2025-11-01' },
      { id: 'm8', title: 'Launch and share portfolio', completed: false, dueDate: '2025-11-15' },
    ],
    createdAt,
    updatedAt,
  },

  // Yvonne's Goals
  {
    id: 'yvonne-1',
    title: 'Establish Daily Meditation Practice',
    description: 'Build a consistent 20-minute daily meditation practice for inner peace and clarity',
    category: 'spiritual',
    owner: 'Yvonne',
    targetDate,
    completed: false,
    progress: 5,
    milestones: [
      { id: 'm9', title: 'Week 1: Start with 5 minutes daily', completed: false, dueDate: '2025-09-14' },
      { id: 'm10', title: 'Week 4: Increase to 10 minutes', completed: false, dueDate: '2025-10-05' },
      { id: 'm11', title: 'Week 8: Reach 20 minutes daily', completed: false, dueDate: '2025-11-02' },
      { id: 'm12', title: 'Week 12: Complete 84-day streak', completed: false, dueDate: '2025-11-30' },
    ],
    createdAt,
    updatedAt,
  },
  {
    id: 'yvonne-2',
    title: 'Complete Professional Development Course',
    description: 'Finish the advanced certification program and apply new skills at work',
    category: 'career',
    owner: 'Yvonne',
    targetDate: format(addWeeks(mondayThisWeek, 11), 'yyyy-MM-dd'),
    completed: false,
    progress: 15,
    milestones: [
      { id: 'm13', title: 'Complete Modules 1-3', completed: false, dueDate: '2025-10-01' },
      { id: 'm14', title: 'Submit midterm project', completed: false, dueDate: '2025-10-20' },
      { id: 'm15', title: 'Complete final modules', completed: false, dueDate: '2025-11-10' },
      { id: 'm16', title: 'Pass certification exam', completed: false, dueDate: '2025-11-20' },
    ],
    createdAt,
    updatedAt,
  },

  // Family Goals
  {
    id: 'family-1',
    title: 'Plan & Take Dream Vacation',
    description: 'Research, plan, and book our dream vacation for early 2026',
    category: 'family',
    owner: 'both',
    targetDate,
    completed: false,
    progress: 0,
    milestones: [
      { id: 'm17', title: 'Research destinations and budget', completed: false, dueDate: '2025-09-30' },
      { id: 'm18', title: 'Choose destination and dates', completed: false, dueDate: '2025-10-15' },
      { id: 'm19', title: 'Book flights and accommodations', completed: false, dueDate: '2025-11-01' },
      { id: 'm20', title: 'Plan activities and create itinerary', completed: false, dueDate: '2025-11-30' },
    ],
    createdAt,
    updatedAt,
  },
  {
    id: 'family-2',
    title: 'Create Family Emergency Fund',
    description: 'Build a 6-month emergency fund for financial security and peace of mind',
    category: 'financial',
    owner: 'both',
    targetDate,
    completed: false,
    progress: 20,
    milestones: [
      { id: 'm21', title: 'Calculate target emergency fund amount', completed: false, dueDate: '2025-09-15' },
      { id: 'm22', title: 'Open high-yield savings account', completed: false, dueDate: '2025-09-22' },
      { id: 'm23', title: 'Reach 25% of target', completed: false, dueDate: '2025-10-15' },
      { id: 'm24', title: 'Reach 50% of target', completed: false, dueDate: '2025-11-01' },
      { id: 'm25', title: 'Complete full emergency fund', completed: false, dueDate: '2025-11-30' },
    ],
    createdAt,
    updatedAt,
  },
  {
    id: 'family-3',
    title: 'Strengthen Relationship Connection',
    description: 'Dedicate quality time each week to deepen our relationship and communication',
    category: 'relationship',
    owner: 'both',
    targetDate,
    completed: false,
    progress: 10,
    milestones: [
      { id: 'm26', title: 'Schedule weekly date nights', completed: false, dueDate: '2025-09-14' },
      { id: 'm27', title: 'Complete couples communication workshop', completed: false, dueDate: '2025-10-15' },
      { id: 'm28', title: 'Plan monthly relationship check-ins', completed: false, dueDate: '2025-10-30' },
      { id: 'm29', title: 'Create shared vision for 2026', completed: false, dueDate: '2025-11-30' },
    ],
    createdAt,
    updatedAt,
  },
];
};

export const sampleGoals: Goal[] = generateSampleGoals();