// Environment configuration checker
export const checkSupabaseEnv = () => {
  const url = process.env.REACT_APP_SUPABASE_URL;
  const key = process.env.REACT_APP_SUPABASE_ANON_KEY;
  
  console.log('🔍 Environment Check:');
  console.log('- SUPABASE_URL:', url ? '✅ Set' : '❌ Missing');
  console.log('- SUPABASE_KEY:', key ? '✅ Set' : '❌ Missing');
  
  return {
    isConfigured: Boolean(url && key),
    url: url || null,
    hasKey: Boolean(key)
  };
};