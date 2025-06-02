export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          tattoo_type: string
          message: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          tattoo_type: string
          message: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          tattoo_type?: string
          message?: string
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}