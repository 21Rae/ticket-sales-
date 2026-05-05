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

-- 3. Events Table
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    venue TEXT,
    location TEXT,
    date DATE,
    time TEXT,
    starting_price INTEGER, -- startingPrice in TS
    category TEXT,
    image TEXT,
    details JSONB
);

-- 4. Security: Enable RLS and add public read policies
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON teams FOR SELECT USING (true);

ALTER TABLE stadiums ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON stadiums FOR SELECT USING (true);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON events FOR SELECT USING (true);

-- 5. Optional: Insert initial data (You can copy from constants.ts)
