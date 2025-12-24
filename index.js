require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Supabase Postgres connection
 * Uses DATABASE_URL:
 * postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // REQUIRED for Supabase
  },
});

// Optional: verify DB connection on startup
pool.query("SELECT 1")
  .then(() => console.log("Connected to Supabase Postgres"))
  .catch((err) => console.error("DB connection failed", err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("VetSync API is running");
});

/**
 * Sync Veterinarian
 */
app.post("/api/sync/veterinarian", async (req, res) => {
  try {
    const {
      Veterinarian_Id__c,
      Name,
      Email__c,
      Phone__c,
      Clinic_Name__c,
    } = req.body;

    await pool.query(
      `
      INSERT INTO veterinarians
        (veterinarian_id, name, email, phone, clinic_name)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (veterinarian_id)
      DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        clinic_name = EXCLUDED.clinic_name
      `,
      [Veterinarian_Id__c, Name, Email__c, Phone__c, Clinic_Name__c]
    );

    res.status(200).json({ message: "Veterinarian synced successfully" });
  } catch (error) {
    console.error("Vet sync error:", error);
    res.status(500).json({ error: "Veterinarian sync failed" });
  }
});

/**
 * Sync Pet
 */
app.post("/api/sync/pet", async (req, res) => {
  try {
    const {
      Pet_Id__c,
      Name,
      Species__c,
      Age__c,
      Owner_Name__c,
      Veterinarian_Id__c,
    } = req.body;

    await pool.query(
      `
      INSERT INTO pets
        (pet_id, name, species, age, owner_name, veterinarian_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (pet_id)
      DO UPDATE SET
        name = EXCLUDED.name,
        species = EXCLUDED.species,
        age = EXCLUDED.age,
        owner_name = EXCLUDED.owner_name,
        veterinarian_id = EXCLUDED.veterinarian_id
      `,
      [
        Pet_Id__c,
        Name,
        Species__c,
        Age__c,
        Owner_Name__c,
        Veterinarian_Id__c,
      ]
    );

    res.status(200).json({ message: "Pet synced successfully" });
  } catch (error) {
    console.error("Pet sync error:", error);
    res.status(500).json({ error: "Pet sync failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Vet's & Pet's API started on port ${PORT}`);
});
