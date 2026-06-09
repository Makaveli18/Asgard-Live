CREATE TABLE IF NOT EXISTS campaign_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  tattoo_idea text,
  source text DEFAULT 'legacy-event',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE campaign_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone_can_insert_campaign_leads" ON campaign_leads
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "authenticated_can_select_campaign_leads" ON campaign_leads
  FOR SELECT TO authenticated USING (true);
