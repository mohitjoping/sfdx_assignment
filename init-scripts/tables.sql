-- Veterinarians table
CREATE TABLE IF NOT EXISTS veterinarians (
  id BIGSERIAL PRIMARY KEY,
  veterinarian_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  clinic_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pets table
CREATE TABLE IF NOT EXISTS pets (
  id BIGSERIAL PRIMARY KEY,
  pet_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  species TEXT,
  age INTEGER,
  owner_name TEXT,
  veterinarian_id TEXT REFERENCES veterinarians(veterinarian_id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


