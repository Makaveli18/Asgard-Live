/*
# Add Portfolio Subcategories

## Purpose
Introduce subcategories for the portfolio so images can be filtered at two levels
(category -> subcategory), e.g. realism -> animals, fine-line -> floral.
This powers URL-based navigation: /portfolio/realism/animals.

## Changes

### 1. New table: subcategories
- id (text, primary key) — slug used in URLs, e.g. "animals", "floral"
- category_id (text, foreign key -> categories.id) — parent category
- title (text) — display title, e.g. "Animals", "Floral"
- sort_order (int, default 0) — ordering within a category

### 2. New column on images
- subcategory (text, nullable) — slug matching subcategories.id; NULL means
  the image belongs to the category root (no subcategory).

### 3. Data population
- Insert subcategory rows for the known folder structure.
- Backfill images.subcategory by parsing the image URL folder path.

## Security
- RLS enabled on subcategories.
- Public read (anon + authenticated) since portfolio data is intentionally public.
- No insert/update/delete policies needed from the client (admin-managed).
*/

-- 1. Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id text PRIMARY KEY,
  category_id text NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_subcategories" ON subcategories;
CREATE POLICY "anon_read_subcategories" ON subcategories FOR SELECT
  TO anon, authenticated USING (true);

-- 2. Add subcategory column to images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'images' AND column_name = 'subcategory'
  ) THEN
    ALTER TABLE images ADD COLUMN subcategory text;
  END IF;
END $$;

-- 3. Populate subcategory rows
-- Realism
INSERT INTO subcategories (id, category_id, title, sort_order) VALUES
  ('animals', 'realism', 'Animals', 1),
  ('custom-ink', 'realism', 'Custom Ink', 2),
  ('portraits', 'realism', 'Portraits', 3)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, category_id = EXCLUDED.category_id;

-- Fine Line
INSERT INTO subcategories (id, category_id, title, sort_order) VALUES
  ('floral', 'fine-line', 'Floral', 1),
  ('symbolic-iconic', 'fine-line', 'Symbolic & Iconic', 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, category_id = EXCLUDED.category_id;

-- Norse
INSERT INTO subcategories (id, category_id, title, sort_order) VALUES
  ('dark-mythic', 'norse', 'Dark Mythic', 1),
  ('realistic-portraits', 'norse', 'Realistic Portraits', 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, category_id = EXCLUDED.category_id;

-- Blackwork
INSERT INTO subcategories (id, category_id, title, sort_order) VALUES
  ('symbolic-minimal', 'blackwork', 'Symbolic & Minimal', 1)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, category_id = EXCLUDED.category_id;

-- Neo-Traditional
INSERT INTO subcategories (id, category_id, title, sort_order) VALUES
  ('mythic', 'neo-traditional', 'Mythic', 1),
  ('pop-culture', 'neo-traditional', 'Pop Culture', 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, category_id = EXCLUDED.category_id;

-- Ornamental
INSERT INTO subcategories (id, category_id, title, sort_order) VALUES
  ('mandala', 'ornamental', 'Mandala', 1),
  ('realism-dotwork', 'ornamental', 'Realism & Dotwork', 2)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, sort_order = EXCLUDED.sort_order, category_id = EXCLUDED.category_id;

-- 4. Backfill images.subcategory from URL folder paths
UPDATE images SET subcategory = 'animals'
WHERE category = 'realism' AND url LIKE '%/realism/animals/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'custom-ink'
WHERE category = 'realism' AND url LIKE '%/realism/custom ink/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'portraits'
WHERE category = 'realism' AND url LIKE '%/realism/portraits/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'floral'
WHERE category = 'fine-line' AND url LIKE '%/fine line/floral/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'symbolic-iconic'
WHERE category = 'fine-line' AND url LIKE '%/fine line/symbolic - iconic/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'dark-mythic'
WHERE category = 'norse' AND url LIKE '%/norse/dark-mythic/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'realistic-portraits'
WHERE category = 'norse' AND url LIKE '%/norse/realistic-portraits/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'symbolic-minimal'
WHERE category = 'blackwork' AND url LIKE '%/blackwork/symbolic - minimal ink/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'mythic'
WHERE category = 'neo-traditional' AND url LIKE '%/neo-traditional/mythic/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'pop-culture'
WHERE category = 'neo-traditional' AND url LIKE '%/neo-traditional/pop culture/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'mandala'
WHERE category = 'ornamental' AND url LIKE '%/ornamental/mandala/%' AND subcategory IS NULL;

UPDATE images SET subcategory = 'realism-dotwork'
WHERE category = 'ornamental' AND url LIKE '%/ornamental/realism-dotwork/%' AND subcategory IS NULL;

-- Index for efficient subcategory filtering
CREATE INDEX IF NOT EXISTS idx_images_category_subcategory ON images(category, subcategory);
