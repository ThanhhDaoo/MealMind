-- Create database
CREATE DATABASE mealmind_db;

-- Use the database
\c mealmind_db;

-- Create users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create foods table
CREATE TABLE foods (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    calories INTEGER,
    prep_time INTEGER,
    difficulty VARCHAR(50),
    category VARCHAR(100),
    protein DECIMAL(5,2),
    carbs DECIMAL(5,2),
    fat DECIMAL(5,2),
    fiber DECIMAL(5,2)
);

-- Create ingredients table
CREATE TABLE ingredients (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount VARCHAR(100),
    unit VARCHAR(50),
    food_id BIGINT REFERENCES foods(id) ON DELETE CASCADE
);

-- Create food_instructions table
CREATE TABLE food_instructions (
    id BIGSERIAL PRIMARY KEY,
    food_id BIGINT REFERENCES foods(id) ON DELETE CASCADE,
    instruction TEXT NOT NULL,
    step_order INTEGER
);

-- Create meal_plans table
CREATE TABLE meal_plans (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    total_calories INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
);

-- Create meal_plan_items table
CREATE TABLE meal_plan_items (
    id BIGSERIAL PRIMARY KEY,
    meal_type VARCHAR(50) NOT NULL,
    servings INTEGER DEFAULT 1,
    meal_plan_id BIGINT REFERENCES meal_plans(id) ON DELETE CASCADE,
    food_id BIGINT REFERENCES foods(id) ON DELETE CASCADE
);

-- Create user_favorite_foods table (many-to-many relationship)
CREATE TABLE user_favorite_foods (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    food_id BIGINT REFERENCES foods(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, food_id)
);

-- Create indexes for better performance
CREATE INDEX idx_foods_category ON foods(category);
CREATE INDEX idx_foods_calories ON foods(calories);
CREATE INDEX idx_meal_plans_user_date ON meal_plans(user_id, date);
CREATE INDEX idx_meal_plan_items_meal_plan ON meal_plan_items(meal_plan_id);
CREATE INDEX idx_ingredients_food ON ingredients(food_id);