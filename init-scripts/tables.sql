CREATE TABLE veterinarians (
    id SERIAL PRIMARY KEY,
    veterinarian_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    clinic_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    pet_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100),
    species VARCHAR(50),
    age INT,
    owner_name VARCHAR(100),
    veterinarian_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vet
        FOREIGN KEY (veterinarian_id)
        REFERENCES veterinarians(veterinarian_id)
);
