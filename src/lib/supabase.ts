import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables exist and are not placeholder values
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isPlaceholder = (value: string): boolean => {
  return value.includes('your_supabase') || value.includes('_here');
};

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    Missing Supabase environment variables.
    
    Please ensure your .env file contains:
    VITE_SUPABASE_URL=https://your-project-ref.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-public-key
  `);
}

if (isPlaceholder(supabaseUrl) || isPlaceholder(supabaseAnonKey)) {
  throw new Error(`
    Supabase environment variables contain placeholder values.
    
    Please update your .env file with actual values from your Supabase project:
    1. Go to https://supabase.com/dashboard
    2. Select your project
    3. Go to Settings > API
    4. Copy your Project URL and anon/public key
    5. Update the .env file with these values
  `);
}

if (!isValidUrl(supabaseUrl)) {
  throw new Error(`
    Invalid Supabase URL: ${supabaseUrl}
    
    Please ensure VITE_SUPABASE_URL is a valid URL like:
    https://your-project-ref.supabase.co
  `);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});