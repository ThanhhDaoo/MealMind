-- MealMind Database Schema for SQL Server
-- Create database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'mealmind_db')
BEGIN
    CREATE DATABASE mealmind_db;
END
GO

USE mealmind_db;
GO

-- Create users table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) UNIQUE NOT NULL,
        password NVARCHAR(255) NOT NULL,
        role NVARCHAR(50) DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
        status NVARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'BLOCKED')),
        avatar NVARCHAR(500),
        phone NVARCHAR(20),
        date_of_birth DATE,
        gender NVARCHAR(20),
        height DECIMAL(5,2),
        weight DECIMAL(5,2),
        activity_level NVARCHAR(50),
        dietary_preference NVARCHAR(100),
        health_goals NVARCHAR(MAX),
        allergies NVARCHAR(MAX),
        last_login DATETIME,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Create foods table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'foods')
BEGIN
    CREATE TABLE foods (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        description NVARCHAR(MAX),
        image NVARCHAR(500),
        calories INT,
        prep_time INT,
        cook_time INT,
        total_time INT,
        servings INT DEFAULT 1,
        difficulty NVARCHAR(50) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
        category NVARCHAR(100),
        cuisine NVARCHAR(100),
        meal_type NVARCHAR(50),
        diet_type NVARCHAR(100),
        protein DECIMAL(5,2),
        carbs DECIMAL(5,2),
        fat DECIMAL(5,2),
        fiber DECIMAL(5,2),
        sugar DECIMAL(5,2),
        sodium DECIMAL(5,2),
        rating DECIMAL(3,2) DEFAULT 0.00,
        rating_count INT DEFAULT 0,
        view_count INT DEFAULT 0,
        favorite_count INT DEFAULT 0,
        status NVARCHAR(50) DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
        created_by BIGINT,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (created_by) REFERENCES users(id)
    );
END
GO

-- Create ingredients table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ingredients')
BEGIN
    CREATE TABLE ingredients (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        amount NVARCHAR(100),
        unit NVARCHAR(50),
        food_id BIGINT,
        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
    );
END
GO

-- Create food_instructions table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'food_instructions')
BEGIN
    CREATE TABLE food_instructions (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        food_id BIGINT,
        instruction NVARCHAR(MAX) NOT NULL,
        step_order INT,
        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
    );
END
GO

-- Create meal_plans table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'meal_plans')
BEGIN
    CREATE TABLE meal_plans (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        week_start_date DATE NOT NULL,
        week_end_date DATE NOT NULL,
        total_calories INT,
        total_budget DECIMAL(10,2),
        status NVARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'CANCELLED')),
        notes NVARCHAR(MAX),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        user_id BIGINT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
END
GO

-- Create meal_plan_items table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'meal_plan_items')
BEGIN
    CREATE TABLE meal_plan_items (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        day_of_week NVARCHAR(20) NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
        meal_type NVARCHAR(50) NOT NULL CHECK (meal_type IN ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK')),
        servings INT DEFAULT 1,
        notes NVARCHAR(MAX),
        is_completed BIT DEFAULT 0,
        meal_plan_id BIGINT,
        food_id BIGINT,
        created_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE,
        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE NO ACTION
    );
END
GO

-- Create user_favorite_foods table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_favorite_foods')
BEGIN
    CREATE TABLE user_favorite_foods (
        user_id BIGINT,
        food_id BIGINT,
        created_at DATETIME DEFAULT GETDATE(),
        PRIMARY KEY (user_id, food_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE NO ACTION
    );
END
GO

-- Create food_reviews table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'food_reviews')
BEGIN
    CREATE TABLE food_reviews (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment NVARCHAR(MAX),
        user_id BIGINT,
        food_id BIGINT,
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE NO ACTION,
        UNIQUE(user_id, food_id)
    );
END
GO

-- Create ai_recommendations table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'ai_recommendations')
BEGIN
    CREATE TABLE ai_recommendations (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT,
        recommended_food_id BIGINT,
        recommendation_type NVARCHAR(50) CHECK (recommendation_type IN ('PERSONALIZED', 'TRENDING', 'SEASONAL', 'HEALTH_GOAL')),
        reason NVARCHAR(MAX),
        confidence_score DECIMAL(3,2),
        is_accepted BIT DEFAULT 0,
        created_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (recommended_food_id) REFERENCES foods(id) ON DELETE NO ACTION
    );
END
GO

-- Create user_activity_logs table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_activity_logs')
BEGIN
    CREATE TABLE user_activity_logs (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT,
        activity_type NVARCHAR(100) NOT NULL,
        activity_description NVARCHAR(MAX),
        ip_address NVARCHAR(50),
        user_agent NVARCHAR(MAX),
        created_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
END
GO

-- Create shopping_lists table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'shopping_lists')
BEGIN
    CREATE TABLE shopping_lists (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        meal_plan_id BIGINT,
        user_id BIGINT,
        status NVARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED')),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION
    );
END
GO

-- Create shopping_list_items table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'shopping_list_items')
BEGIN
    CREATE TABLE shopping_list_items (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        shopping_list_id BIGINT,
        ingredient_name NVARCHAR(255) NOT NULL,
        quantity NVARCHAR(100),
        unit NVARCHAR(50),
        category NVARCHAR(100),
        estimated_price DECIMAL(10,2),
        is_purchased BIT DEFAULT 0,
        notes NVARCHAR(MAX),
        created_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (shopping_list_id) REFERENCES shopping_lists(id) ON DELETE CASCADE
    );
END
GO

-- Create notifications table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'notifications')
BEGIN
    CREATE TABLE notifications (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        user_id BIGINT,
        title NVARCHAR(255) NOT NULL,
        message NVARCHAR(MAX) NOT NULL,
        type NVARCHAR(50) CHECK (type IN ('INFO', 'SUCCESS', 'WARNING', 'ERROR')),
        is_read BIT DEFAULT 0,
        link NVARCHAR(500),
        created_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
END
GO

-- Create system_settings table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'system_settings')
BEGIN
    CREATE TABLE system_settings (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        setting_key NVARCHAR(100) UNIQUE NOT NULL,
        setting_value NVARCHAR(MAX),
        description NVARCHAR(MAX),
        updated_at DATETIME DEFAULT GETDATE()
    );
END
GO

-- Create indexes for better performance
CREATE NONCLUSTERED INDEX idx_users_email ON users(email);
CREATE NONCLUSTERED INDEX idx_users_role ON users(role);
CREATE NONCLUSTERED INDEX idx_users_status ON users(status);
CREATE NONCLUSTERED INDEX idx_foods_category ON foods(category);
CREATE NONCLUSTERED INDEX idx_foods_calories ON foods(calories);
CREATE NONCLUSTERED INDEX idx_foods_status ON foods(status);
CREATE NONCLUSTERED INDEX idx_foods_rating ON foods(rating);
CREATE NONCLUSTERED INDEX idx_meal_plans_user_date ON meal_plans(user_id, week_start_date);
CREATE NONCLUSTERED INDEX idx_meal_plan_items_meal_plan ON meal_plan_items(meal_plan_id);
CREATE NONCLUSTERED INDEX idx_meal_plan_items_day ON meal_plan_items(day_of_week);
CREATE NONCLUSTERED INDEX idx_ingredients_food ON ingredients(food_id);
CREATE NONCLUSTERED INDEX idx_food_reviews_food ON food_reviews(food_id);
CREATE NONCLUSTERED INDEX idx_food_reviews_user ON food_reviews(user_id);
CREATE NONCLUSTERED INDEX idx_ai_recommendations_user ON ai_recommendations(user_id);
CREATE NONCLUSTERED INDEX idx_user_activity_logs_user ON user_activity_logs(user_id);
CREATE NONCLUSTERED INDEX idx_notifications_user ON notifications(user_id);
CREATE NONCLUSTERED INDEX idx_shopping_lists_user ON shopping_lists(user_id);
GO

-- Create triggers for updated_at timestamps
CREATE OR ALTER TRIGGER trg_users_updated_at
ON users
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE users
    SET updated_at = GETDATE()
    FROM users u
    INNER JOIN inserted i ON u.id = i.id;
END
GO

CREATE OR ALTER TRIGGER trg_foods_updated_at
ON foods
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE foods
    SET updated_at = GETDATE()
    FROM foods f
    INNER JOIN inserted i ON f.id = i.id;
END
GO

CREATE OR ALTER TRIGGER trg_meal_plans_updated_at
ON meal_plans
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE meal_plans
    SET updated_at = GETDATE()
    FROM meal_plans mp
    INNER JOIN inserted i ON mp.id = i.id;
END
GO

CREATE OR ALTER TRIGGER trg_food_reviews_updated_at
ON food_reviews
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE food_reviews
    SET updated_at = GETDATE()
    FROM food_reviews fr
    INNER JOIN inserted i ON fr.id = i.id;
END
GO

CREATE OR ALTER TRIGGER trg_shopping_lists_updated_at
ON shopping_lists
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE shopping_lists
    SET updated_at = GETDATE()
    FROM shopping_lists sl
    INNER JOIN inserted i ON sl.id = i.id;
END
GO

PRINT 'Database schema created successfully!';
GO
