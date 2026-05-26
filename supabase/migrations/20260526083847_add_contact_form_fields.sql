/*
  # Add new fields to contact_submissions

  1. Modified Tables
    - `contact_submissions`
      - `preferred_timeframe` (text, nullable) - preferred appointment timeframe
      - `reference_image_url` (text, nullable) - URL to uploaded reference image in Supabase Storage
      - `preferred_artist` (text, nullable) - which artist the client prefers
  
  2. Important Notes
    - All new columns are nullable to maintain backward compatibility with existing submissions
    - No data loss occurs with this migration
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'preferred_timeframe'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN preferred_timeframe text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'reference_image_url'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN reference_image_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'preferred_artist'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN preferred_artist text;
  END IF;
END $$;
