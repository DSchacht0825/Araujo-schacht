import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal, WeeklyPlan, Task, DailyRhythm, VisionBoard, User, YearReview } from '../types';
import { initialWeeklyPlans } from '../data/weeklyPlans';
import { sampleGoals } from '../data/sampleGoals';
import { sampleTasks } from '../data/sampleTasks';
import { validateLogin } from '../auth/authConfig';

interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  authError: string | null;
  userPasswords: { [key: string]: string };
  goals: Goal[];
  weeklyPlans: WeeklyPlan[];
  tasks: Task[];
  dailyRhythms: DailyRhythm[];
  visionBoards: VisionBoard[];
  yearReview: YearReview | null;
  
  // Auth actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  clearAuthError: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
  
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
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      authError: null,
      userPasswords: {}, // Will store custom passwords if changed
      goals: sampleGoals,
      weeklyPlans: initialWeeklyPlans,
      tasks: sampleTasks,
      dailyRhythms: [],
      visionBoards: [],
      yearReview: null,
      
      // Auth
      login: (email: string, password: string) => {
        const state = get();
        const customPasswords = state.userPasswords;
        
        // First try validateLogin with the provided credentials
        const user = validateLogin(email, password);
        
        if (user) {
          // Login successful with default password
          set({ 
            currentUser: user.name, 
            isAuthenticated: true, 
            authError: null 
          });
          return true;
        }
        
        // If default password didn't work, check custom passwords
        // Determine which user is logging in based on email
        let userName: 'Daniel' | 'Yvonne' | null = null;
        const emailLower = email.toLowerCase();
        
        if (emailLower === 'schacht.dan@gmail.com') {
          userName = 'Daniel';
        } else if (emailLower === 'yviea2013@gmail.com') {
          userName = 'Yvonne';
        }
        
        if (userName && customPasswords[userName]) {
          // Check custom password
          if (password === customPasswords[userName]) {
            set({ 
              currentUser: userName, 
              isAuthenticated: true, 
              authError: null 
            });
            return true;
          }
        }
        
        // Failed authentication
        set({ 
          currentUser: null, 
          isAuthenticated: false, 
          authError: 'Invalid email or password' 
        });
        return false;
      },
      logout: () => set({ 
        currentUser: null, 
        isAuthenticated: false, 
        authError: null 
      }),
      clearAuthError: () => set({ authError: null }),
      updatePassword: (currentPassword: string, newPassword: string) => {
        const state = get();
        const currentUser = state.currentUser;
        
        if (!currentUser) return false;
        
        // Check if current password is correct
        const customPassword = state.userPasswords[currentUser];
        const defaultPassword = currentUser === 'Daniel' ? 'ChangeMe2025!D' : 'ChangeMe2025!Y';
        const actualCurrentPassword = customPassword || defaultPassword;
        
        if (currentPassword !== actualCurrentPassword) {
          return false;
        }
        
        // Update password
        set({
          userPasswords: {
            ...state.userPasswords,
            [currentUser]: newPassword
          }
        });
        
        return true;
      },
      
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
      addWeeklyPlan: (plan) => {
        console.log('Store: Adding weekly plan:', plan);
        set((state) => {
          const newState = { weeklyPlans: [...state.weeklyPlans, plan] };
          console.log('Store: New weekly plans count:', newState.weeklyPlans.length);
          return newState;
        });
      },
      updateWeeklyPlan: (id, updates) => {
        console.log('Store: Updating weekly plan:', id, updates);
        set((state) => {
          const updatedPlans = state.weeklyPlans.map((p) => 
            p.id === id ? { ...p, ...updates } : p
          );
          console.log('Store: Updated plan:', updatedPlans.find(p => p.id === id));
          return { weeklyPlans: updatedPlans };
        });
      },
      
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