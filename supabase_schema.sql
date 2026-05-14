-- Run these commands in your Supabase SQL Editor to set up the database schema

-- 1. Teams Table
CREATE TABLE teams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    "group" TEXT,
    ranking INTEGER,
    flag_code TEXT -- flagCode in TS, mapping handled if needed or keep as flagCode
);

-- 2. Stadiums Table
CREATE TABLE stadiums (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT,
    country TEXT,
    capacity TEXT,
    description TEXT,
    image TEXT
);

-- 3. Cities Table
CREATE TABLE cities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT,
    description TEXT,
    stadium TEXT,
    image TEXT,
    highlights TEXT[] -- Array of strings for highlights
);

-- 4. Matches Table (Reflects the UI Event structure)
CREATE TABLE matches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,           -- e.g., "Mexico vs. South Africa"
    home_team_id TEXT REFERENCES teams(id),
    away_team_id TEXT REFERENCES teams(id),
    stadium_id TEXT REFERENCES stadiums(id),
    venue TEXT,                  -- e.g., "Mexico City Stadium"
    location TEXT,               -- e.g., "Mexico City, MX"
    date DATE NOT NULL,
    time TIME NOT NULL,
    starting_price INTEGER,      -- maps to startingPrice
    category TEXT DEFAULT 'Sports',
    image TEXT,                  -- main event image
    details JSONB,               -- for rankings, historical, weather
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Ticket Categories Table
CREATE TABLE ticket_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    base_price NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Payment Proofs Table
CREATE TABLE payment_proofs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    image_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, verified, rejected
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Security: Enable RLS and add public read policies
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON teams FOR SELECT USING (true);

ALTER TABLE stadiums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON stadiums FOR SELECT USING (true);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON cities FOR SELECT USING (true);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON matches FOR SELECT USING (true);

ALTER TABLE ticket_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON ticket_categories FOR SELECT USING (true);

ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert their own proof" ON payment_proofs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can read their own proof" ON payment_proofs FOR SELECT USING (auth.uid() = user_id);

-- 8. Enable Realtime for all tables
-- IMPORTANT: In some environments, the 'supabase_realtime' publication might not exist.
-- If you get an error that the publication doesn't exist, you can create it with:
-- CREATE PUBLICATION supabase_realtime FOR ALL TABLES;

BEGIN;
  -- Add tables to the publication
  -- We use this approach because it's the standard for Supabase projects
  ALTER PUBLICATION supabase_realtime ADD TABLE stadiums;
  ALTER PUBLICATION supabase_realtime ADD TABLE matches;
  ALTER PUBLICATION supabase_realtime ADD TABLE teams;
  ALTER PUBLICATION supabase_realtime ADD TABLE cities;
  ALTER PUBLICATION supabase_realtime ADD TABLE ticket_categories;
  ALTER PUBLICATION supabase_realtime ADD TABLE payment_proofs;
-- Note: If you have already added these individual tables, you can also just use:
-- ALTER PUBLICATION supabase_realtime ADD TABLE host_cities; -- if cities table was renamed or similar
COMMIT;

-- 9. Storage Setup
-- Run these to create your bucket if not done via UI
-- INSERT INTO storage.buckets (id, name, public) VALUES ('payment-proofs', 'payment-proofs', true) ON CONFLICT (id) DO NOTHING;

-- 10. Database Triggers for Edge Functions
-- This requires high privileges, often better to use Supabase Dashboard > Database > Webhooks
/*
CREATE OR REPLACE FUNCTION public.notify_payment_v1()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://' || current_setting('request.headers')::json->>'host' || '/functions/v1/payment-confirmation',
      headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || current_setting('request.headers')::json->>'authorization'),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_payment_proof_inserted
AFTER INSERT ON public.payment_proofs
FOR EACH ROW EXECUTE FUNCTION public.notify_payment_v1();
*/

-- 11. End of Schema Setup
