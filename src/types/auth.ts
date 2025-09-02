import { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  user_id: string;
  nome: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, nome: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

export interface AuthFormData {
  email: string;
  password: string;
  nome?: string;
  confirmPassword?: string;
}