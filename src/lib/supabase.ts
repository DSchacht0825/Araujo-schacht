import { createClient } from '@supabase/supabase-js'

// You'll need to replace these with your actual Supabase project credentials
// Get them from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Only create Supabase client if environment variables are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey)

// Database type definitions for TypeScript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          owner: string
          target_date: string
          completed: boolean
          progress: number
          milestones: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          owner: string
          target_date: string
          completed?: boolean
          progress?: number
          milestones?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          owner?: string
          target_date?: string
          completed?: boolean
          progress?: number
          milestones?: any[]
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          completed: boolean
          owner: string
          due_date: string
          priority: string
          goal_id: string | null
          reminder: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          completed?: boolean
          owner: string
          due_date: string
          priority: string
          goal_id?: string | null
          reminder?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          completed?: boolean
          owner?: string
          due_date?: string
          priority?: string
          goal_id?: string | null
          reminder?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      weekly_plans: {
        Row: {
          id: string
          week_number: number
          start_date: string
          end_date: string
          focus: string
          wins: string[]
          lessons: string[]
          owner: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          week_number: number
          start_date: string
          end_date: string
          focus: string
          wins?: string[]
          lessons?: string[]
          owner: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          week_number?: number
          start_date?: string
          end_date?: string
          focus?: string
          wins?: string[]
          lessons?: string[]
          owner?: string
          created_at?: string
          updated_at?: string
        }
      }
      daily_rhythms: {
        Row: {
          id: string
          date: string
          owner: string
          habits: any[]
          gratitude: string[]
          top_priorities: string[]
          notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          owner: string
          habits: any[]
          gratitude: string[]
          top_priorities: string[]
          notes: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          owner?: string
          habits?: any[]
          gratitude?: string[]
          top_priorities?: string[]
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      vision_boards: {
        Row: {
          id: string
          owner: string
          title: string
          images: string[]
          quotes: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner: string
          title: string
          images: string[]
          quotes: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner?: string
          title?: string
          images?: string[]
          quotes?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}