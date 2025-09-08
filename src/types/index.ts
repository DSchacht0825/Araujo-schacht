export type User = 'Yvonne' | 'Daniel';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'personal' | 'family' | 'career' | 'health' | 'financial' | 'spiritual' | 'relationship';
  owner: User | 'both';
  targetDate: string;
  completed: boolean;
  progress: number;
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export interface WeeklyPlan {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  focus: string;
  wins: string[];
  lessons: string[];
  tasks: Task[];
  owner: User | 'both';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  owner: User | 'both';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  goalId?: string;
  reminder?: string;
}

export interface DailyRhythm {
  id: string;
  date: string;
  owner: User;
  habits: Habit[];
  gratitude: string[];
  topPriorities: string[];
  notes: string;
}

export interface Habit {
  id: string;
  title: string;
  completed: boolean;
  streak: number;
}

export interface VisionBoard {
  id: string;
  owner: User | 'both';
  title: string;
  images: string[];
  quotes: string[];
  createdAt: string;
}

export interface YearReview {
  year: number;
  accomplishments: string[];
  lessonsLearned: string[];
  areasOfGrowth: string[];
  gratefulFor: string[];
}