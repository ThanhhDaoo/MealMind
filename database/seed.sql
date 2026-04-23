-- Insert sample users
INSERT INTO users (name, email, password) VALUES 
('Nguyen Van A', 'user1@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), -- password: password
('Tran Thi B', 'user2@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert sample foods
INSERT INTO foods (name, description, image, calories, prep_time, difficulty, category, protein, carbs, fat, fiber) VALUES 
('Phở Bò', 'Món phở truyền thống Việt Nam với nước dùng thơm ngon', 'https://example.com/pho.jpg', 350, 45, 'Medium', 'lunch', 25.0, 40.0, 8.0, 3.0),
('Bánh Mì Thịt Nướng', 'Bánh mì giòn với thịt nướng thơm lừng', 'https://example.com/banh-mi.jpg', 420, 15, 'Easy', 'breakfast', 20.0, 45.0, 15.0, 4.0),
('Cơm Tấm Sườn Nướng', 'Cơm tấm với sườn nướng đặc trưng miền Nam', 'https://example.com/com-tam.jpg', 580, 30, 'Medium', 'dinner', 35.0, 65.0, 18.0, 2.0),
('Gỏi Cuốn Tôm Thịt', 'Gỏi cuốn tươi mát với tôm và thịt', 'https://example.com/goi-cuon.jpg', 180, 20, 'Easy', 'snack', 12.0, 20.0, 4.0, 6.0),
('Bún Bò Huế', 'Bún bò Huế cay nồng đặc trưng xứ Huế', 'https://example.com/bun-bo-hue.jpg', 400, 60, 'Hard', 'lunch', 28.0, 45.0, 12.0, 5.0),
('Chè Ba Màu', 'Chè ba màu mát lạnh cho ngày hè', 'https://example.com/che-ba-mau.jpg', 250, 25, 'Easy', 'snack', 5.0, 55.0, 3.0, 8.0);

-- Insert sample ingredients
INSERT INTO ingredients (name, amount, unit, food_id) VALUES 
-- Phở Bò ingredients
('Bánh phở', '200', 'g', 1),
('Thịt bò', '150', 'g', 1),
('Hành tây', '1', 'củ', 1),
('Ngò gai', '50', 'g', 1),
('Giá đỗ', '100', 'g', 1),

-- Bánh Mì ingredients
('Bánh mì', '1', 'ổ', 2),
('Thịt nướng', '100', 'g', 2),
('Pate', '20', 'g', 2),
('Rau thơm', '30', 'g', 2),
('Dưa chua', '50', 'g', 2),

-- Cơm Tấm ingredients
('Cơm tấm', '200', 'g', 3),
('Sườn nướng', '200', 'g', 3),
('Trứng ốp la', '1', 'quả', 3),
('Dưa chua', '50', 'g', 3),
('Nước mắm pha', '30', 'ml', 3);

-- Insert sample food instructions
INSERT INTO food_instructions (food_id, instruction, step_order) VALUES 
-- Phở Bò instructions
(1, 'Nấu nước dùng từ xương bò trong 3-4 tiếng', 1),
(1, 'Luộc bánh phở và để ráo', 2),
(1, 'Thái thịt bò mỏng, blanch qua nước sôi', 3),
(1, 'Cho bánh phở vào t그릇, thêm thịt bò và rau thơm', 4),
(1, 'Đổ nước dùng nóng vào và thưởng thức', 5),

-- Bánh Mì instructions
(2, 'Nướng bánh mì cho giòn', 1),
(2, 'Phết pate lên bánh', 2),
(2, 'Thêm thịt nướng, rau thơm và dưa chua', 3),
(2, 'Đậy bánh lại và thưởng thức', 4);

-- Insert sample meal plans
INSERT INTO meal_plans (name, date, total_calories, user_id) VALUES 
('Kế hoạch ăn hôm nay', '2024-01-15', 1200, 1),
('Kế hoạch ăn cuối tuần', '2024-01-16', 1500, 1);

-- Insert sample meal plan items
INSERT INTO meal_plan_items (meal_type, servings, meal_plan_id, food_id) VALUES 
-- Meal plan 1
('BREAKFAST', 1, 1, 2), -- Bánh Mì
('LUNCH', 1, 1, 1),     -- Phở Bò
('DINNER', 1, 1, 4),    -- Gỏi Cuốn
('SNACK', 1, 1, 6),     -- Chè Ba Màu

-- Meal plan 2
('BREAKFAST', 1, 2, 2), -- Bánh Mì
('LUNCH', 1, 2, 5),     -- Bún Bò Huế
('DINNER', 1, 2, 3),    -- Cơm Tấm
('SNACK', 1, 2, 4);     -- Gỏi Cuốn

-- Insert sample favorite foods
INSERT INTO user_favorite_foods (user_id, food_id) VALUES 
(1, 1), -- User 1 likes Phở Bò
(1, 2), -- User 1 likes Bánh Mì
(1, 4), -- User 1 likes Gỏi Cuốn
(2, 1), -- User 2 likes Phở Bò
(2, 3), -- User 2 likes Cơm Tấm
(2, 5); -- User 2 likes Bún Bò Huế