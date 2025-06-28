import { useEffect, useState } from 'react'
import { supabase }       from '../lib/supabaseClient'
export interface ImageRecord {
  id:          string
  file_name:   string
  url:         string
  description: string | null
  metadata:    { category?: string }
}

export function useImages() {
  const [images,  setImages]  = useState<ImageRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from<'images', ImageRecord>('images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error)   console.error('Error loading images:', error.message)
      else if (data) setImages(data)

      setLoading(false)
    }
    load()
  }, [])

  return { images, loading }
}