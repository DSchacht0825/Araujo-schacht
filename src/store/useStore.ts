import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal, WeeklyPlan, Task, DailyRhythm, VisionBoard, User, YearReview } from '../types';

interface AppState {
  currentUser: User | null;
  goals: Goal[];
  weeklyPlans: WeeklyPlan[];
  tasks: Task[];
  dailyRhythms: DailyRhythm[];
  visionBoards: VisionBoard[];
  yearReview: YearReview | null;
  
  // Auth actions
  login: (user: User) => void;
  logout: () => void;
  
  // Goal actions
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  
  // Task actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  
  // Weekly Plan actions
  addWeeklyPlan: (plan: WeeklyPlan) => void;
  updateWeeklyPlan: (id: string, updates: Partial<WeeklyPlan>) => void;
  
  // Daily Rhythm actions
  addDailyRhythm: (rhythm: DailyRhythm) => void;
  updateDailyRhythm: (id: string, updates: Partial<DailyRhythm>) => void;
  
  // Vision Board actions
  addVisionBoard: (board: VisionBoard) => void;
  updateVisionBoard: (id: string, updates: Partial<VisionBoard>) => void;
  
  // Year Review actions
  setYearReview: (review: YearReview) => void;
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      goals: [],
      weeklyPlans: [],
      tasks: [],
      dailyRhythms: [],
      visionBoards: [],
      yearReview: null,
      
      // Auth
      login: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
      
      // Goals
      addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
      updateGoal: (id, updates) => set((state) => ({
        goals: state.goals.map((g) => g.id === id ? { ...g, ...updates } : g)
      })),
      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter((g) => g.id !== id)
      })),
      
      // Tasks
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map((t) => 
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      })),
      
      // Weekly Plans
      addWeeklyPlan: (plan) => set((state) => ({ 
        weeklyPlans: [...state.weeklyPlans, plan] 
      })),
      updateWeeklyPlan: (id, updates) => set((state) => ({
        weeklyPlans: state.weeklyPlans.map((p) => 
          p.id === id ? { ...p, ...updates } : p
        )
      })),
      
      // Daily Rhythms
      addDailyRhythm: (rhythm) => set((state) => ({ 
        dailyRhythms: [...state.dailyRhythms, rhythm] 
      })),
      updateDailyRhythm: (id, updates) => set((state) => ({
        dailyRhythms: state.dailyRhythms.map((r) => 
          r.id === id ? { ...r, ...updates } : r
        )
      })),
      
      // Vision Boards
      addVisionBoard: (board) => set((state) => ({ 
        visionBoards: [...state.visionBoards, board] 
      })),
      updateVisionBoard: (id, updates) => set((state) => ({
        visionBoards: state.visionBoards.map((b) => 
          b.id === id ? { ...b, ...updates } : b
        )
      })),
      
      // Year Review
      setYearReview: (review) => set({ yearReview: review }),
    }),
    {
      name: 'araujo-schacht-planner',
    }
  )
);

export default useStore;