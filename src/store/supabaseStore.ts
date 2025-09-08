import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Goal, WeeklyPlan, Task, DailyRhythm, VisionBoard, User, YearReview } from '../types';
import { validateLogin } from '../auth/authConfig';
import { 
  goalsService, 
  tasksService, 
  weeklyPlansService, 
  dailyRhythmsService, 
  visionBoardsService 
} from '../services/supabaseService';

interface AppState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  authError: string | null;
  userPasswords: { [key: string]: string };
  
  // Data
  goals: Goal[];
  weeklyPlans: WeeklyPlan[];
  tasks: Task[];
  dailyRhythms: DailyRhythm[];
  visionBoards: VisionBoard[];
  yearReview: YearReview | null;
  
  // Sync status
  isOnline: boolean;
  lastSync: string | null;
  syncError: string | null;
  
  // Auth actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  clearAuthError: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
  
  // Data actions
  addGoal: (goal: Goal) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  
  addTask: (task: Task) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  
  addWeeklyPlan: (plan: WeeklyPlan) => Promise<void>;
  updateWeeklyPlan: (id: string, updates: Partial<WeeklyPlan>) => Promise<void>;
  
  addDailyRhythm: (rhythm: DailyRhythm) => Promise<void>;
  updateDailyRhythm: (id: string, updates: Partial<DailyRhythm>) => Promise<void>;
  
  addVisionBoard: (board: VisionBoard) => Promise<void>;
  updateVisionBoard: (id: string, updates: Partial<VisionBoard>) => Promise<void>;
  
  setYearReview: (review: YearReview) => void;
  
  // Sync actions
  syncData: () => Promise<void>;
  loadInitialData: () => Promise<void>;
}

const useSupabaseStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth state
      currentUser: null,
      isAuthenticated: false,
      authError: null,
      userPasswords: {},
      
      // Data state
      goals: [],
      weeklyPlans: [],
      tasks: [],
      dailyRhythms: [],
      visionBoards: [],
      yearReview: null,
      
      // Sync state
      isOnline: navigator.onLine,
      lastSync: null,
      syncError: null,
      
      // Auth actions
      login: (email: string, password: string) => {
        const state = get();
        const customPasswords = state.userPasswords;
        
        // Determine which user is logging in
        let userName: 'Daniel' | 'Yvonne' | null = null;
        if (email.toLowerCase().includes('daniel')) {
          userName = 'Daniel';
        } else if (email.toLowerCase().includes('yvonne')) {
          userName = 'Yvonne';
        }
        
        if (userName) {
          // Check custom password first if it exists
          if (customPasswords[userName] && password === customPasswords[userName]) {
            set({ 
              currentUser: userName, 
              isAuthenticated: true, 
              authError: null 
            });
            // Load initial data after successful login
            get().loadInitialData();
            return true;
          }
          
          // If no custom password or custom password doesn't match, try default
          const user = validateLogin(email, password);
          if (user) {
            set({ 
              currentUser: user.name, 
              isAuthenticated: true, 
              authError: null 
            });
            // Load initial data after successful login
            get().loadInitialData();
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
        authError: null,
        goals: [],
        weeklyPlans: [],
        tasks: [],
        dailyRhythms: [],
        visionBoards: [],
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
      addGoal: async (goal) => {
        try {
          if (navigator.onLine) {
            const createdGoal = await goalsService.create(goal);
            set((state) => ({ 
              goals: [...state.goals, createdGoal],
              lastSync: new Date().toISOString(),
              syncError: null 
            }));
          } else {
            // Offline: just add locally
            set((state) => ({ goals: [...state.goals, goal] }));
          }
        } catch (error) {
          set({ syncError: (error as Error).message });
          // Fall back to local storage
          set((state) => ({ goals: [...state.goals, goal] }));
        }
      },
      
      updateGoal: async (id, updates) => {
        try {
          if (navigator.onLine) {
            await goalsService.update(id, updates);
            set({ lastSync: new Date().toISOString(), syncError: null });
          }
          
          set((state) => ({
            goals: state.goals.map((g) => g.id === id ? { ...g, ...updates } : g)
          }));
        } catch (error) {
          set({ syncError: (error as Error).message });
          // Still update locally
          set((state) => ({
            goals: state.goals.map((g) => g.id === id ? { ...g, ...updates } : g)
          }));
        }
      },
      
      deleteGoal: async (id) => {
        try {
          if (navigator.onLine) {
            await goalsService.delete(id);
            set({ lastSync: new Date().toISOString(), syncError: null });
          }
          
          set((state) => ({
            goals: state.goals.filter((g) => g.id !== id)
          }));
        } catch (error) {
          set({ syncError: (error as Error).message });
          // Still delete locally
          set((state) => ({
            goals: state.goals.filter((g) => g.id !== id)
          }));
        }
      },
      
      // Tasks
      addTask: async (task) => {
        try {
          if (navigator.onLine) {
            const createdTask = await tasksService.create(task);
            set((state) => ({ 
              tasks: [...state.tasks, createdTask],
              lastSync: new Date().toISOString(),
              syncError: null 
            }));
          } else {
            set((state) => ({ tasks: [...state.tasks, task] }));
          }
        } catch (error) {
          set({ syncError: (error as Error).message });
          set((state) => ({ tasks: [...state.tasks, task] }));
        }
      },
      
      updateTask: async (id, updates) => {
        try {
          if (navigator.onLine) {
            await tasksService.update(id, updates);
            set({ lastSync: new Date().toISOString(), syncError: null });
          }
          
          set((state) => ({
            tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
          }));
        } catch (error) {
          set({ syncError: (error as Error).message });
          set((state) => ({
            tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
          }));
        }
      },
      
      deleteTask: async (id) => {
        try {
          if (navigator.onLine) {
            await tasksService.delete(id);
            set({ lastSync: new Date().toISOString(), syncError: null });
          }
          
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id)
          }));
        } catch (error) {
          set({ syncError: (error as Error).message });
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id)
          }));
        }
      },
      
      toggleTask: async (id) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === id);
        if (task) {
          await get().updateTask(id, { completed: !task.completed });
        }
      },
      
      // Weekly Plans
      addWeeklyPlan: async (plan) => {
        set((state) => ({ weeklyPlans: [...state.weeklyPlans, plan] }));
      },
      
      updateWeeklyPlan: async (id, updates) => {
        try {
          if (navigator.onLine) {
            await weeklyPlansService.update(id, updates);
            set({ lastSync: new Date().toISOString(), syncError: null });
          }
          
          set((state) => ({
            weeklyPlans: state.weeklyPlans.map((p) => 
              p.id === id ? { ...p, ...updates } : p
            )
          }));
        } catch (error) {
          set({ syncError: (error as Error).message });
          set((state) => ({
            weeklyPlans: state.weeklyPlans.map((p) => 
              p.id === id ? { ...p, ...updates } : p
            )
          }));
        }
      },
      
      // Daily Rhythms
      addDailyRhythm: async (rhythm) => {
        try {
          if (navigator.onLine) {
            await dailyRhythmsService.upsert(rhythm);
            set({ lastSync: new Date().toISOString(), syncError: null });
          }
          
          set((state) => ({ 
            dailyRhythms: [...state.dailyRhythms.filter(r => !(r.date === rhythm.date && r.owner === rhythm.owner)), rhythm]
          }));
        } catch (error) {
          set({ syncError: (error as Error).message });
          set((state) => ({ 
            dailyRhythms: [...state.dailyRhythms.filter(r => !(r.date === rhythm.date && r.owner === rhythm.owner)), rhythm]
          }));
        }
      },
      
      updateDailyRhythm: async (id, updates) => {
        const state = get();
        const rhythm = state.dailyRhythms.find(r => r.id === id);
        if (rhythm) {
          const updatedRhythm = { ...rhythm, ...updates };
          await get().addDailyRhythm(updatedRhythm);
        }
      },
      
      // Vision Boards
      addVisionBoard: async (board) => {
        try {
          if (navigator.onLine) {
            const createdBoard = await visionBoardsService.create(board);
            set((state) => ({ 
              visionBoards: [...state.visionBoards, createdBoard],
              lastSync: new Date().toISOString(),
              syncError: null 
            }));
          } else {
            set((state) => ({ visionBoards: [...state.visionBoards, board] }));
          }
        } catch (error) {
          set({ syncError: (error as Error).message });
          set((state) => ({ visionBoards: [...state.visionBoards, board] }));
        }
      },
      
      updateVisionBoard: async (id, updates) => {
        try {
          if (navigator.onLine) {
            await visionBoardsService.update(id, updates);
            set({ lastSync: new Date().toISOString(), syncError: null });
          }
          
          set((state) => ({
            visionBoards: state.visionBoards.map((b) => 
              b.id === id ? { ...b, ...updates } : b
            )
          }));
        } catch (error) {
          set({ syncError: (error as Error).message });
          set((state) => ({
            visionBoards: state.visionBoards.map((b) => 
              b.id === id ? { ...b, ...updates } : b
            )
          }));
        }
      },
      
      // Year Review
      setYearReview: (review) => set({ yearReview: review }),
      
      // Load initial data from Supabase
      loadInitialData: async () => {
        if (!navigator.onLine) return;
        
        try {
          const [goals, tasks, weeklyPlans, dailyRhythms, visionBoards] = await Promise.all([
            goalsService.getAll(),
            tasksService.getAll(),
            weeklyPlansService.getAll(),
            dailyRhythmsService.getAll(),
            visionBoardsService.getAll(),
          ]);
          
          set({
            goals,
            tasks,
            weeklyPlans,
            dailyRhythms,
            visionBoards,
            lastSync: new Date().toISOString(),
            syncError: null,
            isOnline: true
          });
        } catch (error) {
          set({ 
            syncError: (error as Error).message,
            isOnline: false
          });
        }
      },
      
      // Manual sync
      syncData: async () => {
        await get().loadInitialData();
      },
    }),
    {
      name: 'araujo-schacht-planner-supabase',
      // Don't persist data arrays - they come from Supabase
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        userPasswords: state.userPasswords,
        yearReview: state.yearReview,
      })
    }
  )
);

// Set up online/offline listeners
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useSupabaseStore.setState({ isOnline: true });
    useSupabaseStore.getState().syncData();
  });
  
  window.addEventListener('offline', () => {
    useSupabaseStore.setState({ isOnline: false });
  });
}

export default useSupabaseStore;