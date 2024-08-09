CREATE DATABASE auth;

CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Auto-incrementing ID column
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the record is created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the record is last updated
    first_name VARCHAR(255) NOT NULL, -- First name of the user
    last_name VARCHAR(255) NOT NULL, -- Last name of the user
    username VARCHAR(255) NOT NULL UNIQUE, -- Username of the user (must be unique)
    email VARCHAR(255) NOT NULL UNIQUE, -- Email of the user (must be unique)
    verified BOOLEAN DEFAULT FALSE, -- Whether the user's email is verified
    password_hash TEXT NOT NULL, -- Hashed password
    password_salt TEXT NOT NULL, -- Password salt
    phone_number VARCHAR(20), -- Optional phone number
    profile_picture TEXT, -- URL to the profile picture
    gender VARCHAR(50) -- Gender of the user
);
