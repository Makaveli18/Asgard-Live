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
          user_id: string
          name: string
          email: string
          phone: string
          tattoo_type: string
          message: string
          created_at: string | null
          preferred_timeframe: string | null
          reference_image_url: string | null
          preferred_artist: string | null
        }
        Insert: {
          user_id?: string
          name: string
          email: string
          phone: string
          tattoo_type: string
          message: string
          created_at?: string | null
          preferred_timeframe?: string | null
          reference_image_url?: string | null
          preferred_artist?: string | null
        }
        Update: {
          user_id?: string
          name?: string
          email?: string
          phone?: string
          tattoo_type?: string
          message?: string
          created_at?: string | null
          preferred_timeframe?: string | null
          reference_image_url?: string | null
          preferred_artist?: string | null
        }
      }
      images: {
        Row: {
          id: string
          file_name: string
          url: string
          description: string | null
          metadata: Json | null
          created_at: string
          category: string | null
          subcategory: string | null
        }
        Insert: {
          id?: string
          file_name: string
          url: string
          description?: string | null
          metadata?: Json | null
          created_at?: string
          category?: string | null
          subcategory?: string | null
        }
        Update: {
          id?: string
          file_name?: string
          url?: string
          description?: string | null
          metadata?: Json | null
          created_at?: string
          category?: string | null
          subcategory?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          title: string
        }
        Insert: {
          id: string
          title: string
        }
        Update: {
          id?: string
          title?: string
        }
      }
      subcategories: {
        Row: {
          id: string
          category_id: string
          title: string
          sort_order: number
        }
        Insert: {
          id: string
          category_id: string
          title: string
          sort_order?: number
        }
        Update: {
          id?: string
          category_id?: string
          title?: string
          sort_order?: number
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
