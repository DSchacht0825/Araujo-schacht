// Main store export - uses Supabase when available, localStorage as fallback
import { isSupabaseConfigured } from '../lib/supabase';
import useLocalStore from './useStore';
import useSupabaseStore from './supabaseStore';

// Export the appropriate store based on configuration
const useStore = isSupabaseConfigured() ? useSupabaseStore : useLocalStore;

export default useStore;