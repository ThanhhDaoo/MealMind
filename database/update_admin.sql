-- Update user to ADMIN role
-- Password hash for "admin123"
USE mealmind_db;
GO

-- Update existing user to admin
UPDATE users 
SET role = 'ADMIN', 
    password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCy'
WHERE email = 'admin@mealmind.com';
GO

-- Or create new admin if not exists
IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@test.com')
BEGIN
    INSERT INTO users (name, email, password, role, status, created_at, updated_at)
    VALUES (N'Admin', 'admin@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhCy', 'ADMIN', 'ACTIVE', GETDATE(), GETDATE());
END
GO

PRINT 'Admin user updated/created successfully!';
PRINT 'Login with: admin@test.com / admin123';
GO
