-- MealMind Seed Data for SQL Server
USE mealmind_db;
GO

-- Insert sample users
SET IDENTITY_INSERT users ON;
INSERT INTO users (id, name, email, password, role, status, avatar, last_login) VALUES 
(1, N'Lê Minh Anh', 'minhanh.le@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 'ACTIVE', 'https://i.pravatar.cc/150?img=12', DATEADD(MINUTE, -2, GETDATE())),
(2, N'Trần Hoàng Nam', 'nam.tran@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', 'ACTIVE', 'https://i.pravatar.cc/150?img=33', DATEADD(HOUR, -10, GETDATE())),
(3, N'Phạm Đức Thịnh', 'thinh.pham@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', 'ACTIVE', 'https://i.pravatar.cc/150?img=68', DATEADD(DAY, -1, GETDATE())),
(4, N'Nguyễn Thu Thảo', 'thao.nguyen@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 'ACTIVE', 'https://i.pravatar.cc/150?img=45', DATEADD(DAY, -3, GETDATE())),
(5, N'Võ Minh Tuấn', 'tuan.vo@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', 'INACTIVE', 'https://i.pravatar.cc/150?img=15', DATEADD(DAY, -7, GETDATE())),
(6, N'Đặng Thị Hương', 'huong.dang@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', 'ACTIVE', 'https://i.pravatar.cc/150?img=47', DATEADD(HOUR, -5, GETDATE()));
SET IDENTITY_INSERT users OFF;
GO

-- Insert sample foods
SET IDENTITY_INSERT foods ON;
INSERT INTO foods (id, name, description, image, calories, prep_time, cook_time, total_time, servings, difficulty, category, cuisine, meal_type, diet_type, protein, carbs, fat, fiber, rating, rating_count, view_count, favorite_count, status, created_by) VALUES 
(1, N'Salad Lúa Mạch & Bơ', N'Salad tươi mát với lúa mạch, bơ và rau xanh giàu dinh dưỡng', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', 320, 15, 0, 15, 2, 'Easy', 'Keto', 'Western', 'lunch', 'Keto', 12.5, 25.0, 18.0, 8.0, 4.9, 1240, 5420, 1240, 'PUBLISHED', 1),
(2, N'Poke Cá Hồi Tươi', N'Poke bowl với cá hồi tươi, cơm và rau củ đầy màu sắc', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', 450, 20, 0, 20, 1, 'Easy', N'Protein Cao', 'Asian', 'lunch', 'High Protein', 35.0, 45.0, 15.0, 5.0, 4.8, 985, 4230, 985, 'PUBLISHED', 1),
(3, N'Mì Ý Sốt Pesto Rau Củ', N'Mì Ý với sốt pesto thơm ngon và rau củ tươi', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop', 380, 10, 15, 25, 2, 'Medium', 'Chay', 'Italian', 'dinner', 'Vegetarian', 12.0, 55.0, 12.0, 6.0, 4.7, 860, 3890, 860, 'PUBLISHED', 1),
(4, N'Ức Gà Nướng Măng Tây', N'Ức gà nướng thơm lừng với măng tây xanh giòn', 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop', 280, 10, 20, 30, 1, 'Easy', N'Ít Carbs', 'Western', 'dinner', 'Low Carb', 42.0, 8.0, 10.0, 4.0, 4.9, 742, 3120, 742, 'PUBLISHED', 1),
(5, N'Phở Bò Truyền Thống', N'Món phở bò truyền thống Việt Nam với nước dùng thơm ngon', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop', 350, 30, 180, 210, 2, 'Hard', N'Truyền Thống', 'Vietnamese', 'lunch', 'Balanced', 25.0, 40.0, 8.0, 3.0, 4.8, 1520, 6780, 1520, 'PUBLISHED', 1),
(6, N'Bánh Mì Thịt Nướng', N'Bánh mì giòn với thịt nướng thơm lừng đặc trưng Việt Nam', 'https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=400&h=300&fit=crop', 420, 15, 10, 25, 1, 'Easy', N'Truyền Thống', 'Vietnamese', 'breakfast', 'Balanced', 20.0, 45.0, 15.0, 4.0, 4.7, 980, 4560, 980, 'PUBLISHED', 1),
(7, N'Cơm Tấm Sườn Nướng', N'Cơm tấm với sườn nướng đặc trưng miền Nam', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', 580, 20, 30, 50, 1, 'Medium', N'Truyền Thống', 'Vietnamese', 'dinner', 'Balanced', 35.0, 65.0, 18.0, 2.0, 4.9, 1340, 5890, 1340, 'PUBLISHED', 1),
(8, N'Gỏi Cuốn Tôm Thịt', N'Gỏi cuốn tươi mát với tôm và thịt, ăn kèm nước chấm', 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop', 180, 20, 0, 20, 4, 'Easy', N'Nhẹ', 'Vietnamese', 'snack', 'Low Calorie', 12.0, 20.0, 4.0, 6.0, 4.6, 670, 2980, 670, 'PUBLISHED', 1),
(9, N'Bún Bò Huế', N'Bún bò Huế cay nồng đặc trưng xứ Huế', 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop', 400, 30, 120, 150, 2, 'Hard', N'Truyền Thống', 'Vietnamese', 'lunch', 'Balanced', 28.0, 45.0, 12.0, 5.0, 4.8, 1120, 4890, 1120, 'PUBLISHED', 1),
(10, N'Chè Ba Màu', N'Chè ba màu mát lạnh cho ngày hè', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop', 250, 25, 0, 25, 2, 'Easy', N'Tráng Miệng', 'Vietnamese', 'snack', 'Dessert', 5.0, 55.0, 3.0, 8.0, 4.5, 540, 2340, 540, 'PUBLISHED', 1),
(11, N'Smoothie Bowl Dâu', N'Smoothie bowl với dâu tây, chuối và granola', 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop', 280, 10, 0, 10, 1, 'Easy', 'Healthy', 'Western', 'breakfast', 'Vegetarian', 8.0, 48.0, 6.0, 10.0, 4.7, 820, 3560, 820, 'PUBLISHED', 1),
(12, N'Cá Hồi Nướng Chanh', N'Cá hồi nướng với chanh và thảo mộc', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop', 340, 10, 15, 25, 1, 'Easy', N'Protein Cao', 'Western', 'dinner', 'High Protein', 38.0, 5.0, 20.0, 2.0, 4.9, 1050, 4670, 1050, 'PUBLISHED', 1);
SET IDENTITY_INSERT foods OFF;
GO

-- Insert sample ingredients
SET IDENTITY_INSERT ingredients ON;
INSERT INTO ingredients (id, name, amount, unit, food_id) VALUES 
-- Salad Lúa Mạch & Bơ
(1, N'Lúa mạch', '100', 'g', 1),
(2, N'Bơ', '1', N'quả', 1),
(3, N'Rau xà lách', '50', 'g', 1),
(4, N'Cà chua cherry', '100', 'g', 1),
(5, N'Dầu olive', '2', 'tbsp', 1),

-- Poke Cá Hồi
(6, N'Cá hồi tươi', '200', 'g', 2),
(7, N'Cơm sushi', '150', 'g', 2),
(8, N'Bơ', '0.5', N'quả', 2),
(9, 'Edamame', '50', 'g', 2),
(10, N'Rong biển', '10', 'g', 2),

-- Phở Bò
(11, N'Bánh phở', '200', 'g', 5),
(12, N'Thịt bò', '150', 'g', 5),
(13, N'Hành tây', '1', N'củ', 5),
(14, N'Ngò gai', '50', 'g', 5),
(15, N'Giá đỗ', '100', 'g', 5),

-- Bánh Mì
(16, N'Bánh mì', '1', N'ổ', 6),
(17, N'Thịt nướng', '100', 'g', 6),
(18, 'Pate', '20', 'g', 6),
(19, N'Rau thơm', '30', 'g', 6),
(20, N'Dưa chua', '50', 'g', 6),

-- Cơm Tấm
(21, N'Cơm tấm', '200', 'g', 7),
(22, N'Sườn nướng', '200', 'g', 7),
(23, N'Trứng ốp la', '1', N'quả', 7),
(24, N'Dưa chua', '50', 'g', 7),
(25, N'Nước mắm pha', '30', 'ml', 7);
SET IDENTITY_INSERT ingredients OFF;
GO

-- Insert sample food instructions
SET IDENTITY_INSERT food_instructions ON;
INSERT INTO food_instructions (id, food_id, instruction, step_order) VALUES 
-- Salad Lúa Mạch & Bơ
(1, 1, N'Nấu lúa mạch theo hướng dẫn trên bao bì', 1),
(2, 1, N'Cắt bơ thành miếng vừa ăn', 2),
(3, 1, N'Rửa sạch rau xà lách và cà chua', 3),
(4, 1, N'Trộn tất cả nguyên liệu với dầu olive', 4),

-- Poke Cá Hồi
(5, 2, N'Cắt cá hồi thành miếng vuông nhỏ', 1),
(6, 2, N'Nấu cơm sushi và để nguội', 2),
(7, 2, N'Chuẩn bị các loại rau củ', 3),
(8, 2, N'Xếp tất cả nguyên liệu vào bát', 4),
(9, 2, N'Rưới nước sốt và thưởng thức', 5),

-- Phở Bò
(10, 5, N'Nấu nước dùng từ xương bò trong 3-4 tiếng', 1),
(11, 5, N'Luộc bánh phở và để ráo', 2),
(12, 5, N'Thái thịt bò mỏng, blanch qua nước sôi', 3),
(13, 5, N'Cho bánh phở vào tô, thêm thịt bò và rau thơm', 4),
(14, 5, N'Đổ nước dùng nóng vào và thưởng thức', 5),

-- Bánh Mì
(15, 6, N'Nướng bánh mì cho giòn', 1),
(16, 6, N'Phết pate lên bánh', 2),
(17, 6, N'Thêm thịt nướng, rau thơm và dưa chua', 3),
(18, 6, N'Đậy bánh lại và thưởng thức', 4),

-- Cơm Tấm
(19, 7, N'Ướp sườn với gia vị và nướng', 1),
(20, 7, N'Nấu cơm tấm', 2),
(21, 7, N'Chiên trứng ốp la', 3),
(22, 7, N'Xếp tất cả lên đĩa và ăn kèm nước mắm', 4);
SET IDENTITY_INSERT food_instructions OFF;
GO

-- Insert sample meal plans
SET IDENTITY_INSERT meal_plans ON;
INSERT INTO meal_plans (id, name, week_start_date, week_end_date, total_calories, total_budget, status, user_id) VALUES 
(1, N'Kế hoạch tuần này', '2024-01-15', '2024-01-21', 8400, 500000, 'ACTIVE', 2),
(2, N'Kế hoạch ăn kiêng', '2024-01-22', '2024-01-28', 7000, 450000, 'ACTIVE', 3),
(3, N'Kế hoạch tăng cơ', '2024-01-15', '2024-01-21', 10500, 600000, 'ACTIVE', 6);
SET IDENTITY_INSERT meal_plans OFF;
GO

-- Insert sample meal plan items
SET IDENTITY_INSERT meal_plan_items ON;
INSERT INTO meal_plan_items (id, day_of_week, meal_type, servings, meal_plan_id, food_id) VALUES 
-- Meal plan 1 - Week plan
(1, 'Monday', 'BREAKFAST', 1, 1, 6),
(2, 'Monday', 'LUNCH', 1, 1, 5),
(3, 'Monday', 'DINNER', 1, 1, 7),
(4, 'Monday', 'SNACK', 1, 1, 8),

(5, 'Tuesday', 'BREAKFAST', 1, 1, 11),
(6, 'Tuesday', 'LUNCH', 1, 1, 2),
(7, 'Tuesday', 'DINNER', 1, 1, 12),
(8, 'Tuesday', 'SNACK', 1, 1, 10),

(9, 'Wednesday', 'BREAKFAST', 1, 1, 6),
(10, 'Wednesday', 'LUNCH', 1, 1, 9),
(11, 'Wednesday', 'DINNER', 1, 1, 4),
(12, 'Wednesday', 'SNACK', 1, 1, 8),

(13, 'Thursday', 'BREAKFAST', 1, 1, 11),
(14, 'Thursday', 'LUNCH', 1, 1, 1),
(15, 'Thursday', 'DINNER', 1, 1, 7),
(16, 'Thursday', 'SNACK', 1, 1, 10),

(17, 'Friday', 'BREAKFAST', 1, 1, 6),
(18, 'Friday', 'LUNCH', 1, 1, 5),
(19, 'Friday', 'DINNER', 1, 1, 12),
(20, 'Friday', 'SNACK', 1, 1, 8),

(21, 'Saturday', 'BREAKFAST', 1, 1, 11),
(22, 'Saturday', 'LUNCH', 1, 1, 2),
(23, 'Saturday', 'DINNER', 1, 1, 3),
(24, 'Saturday', 'SNACK', 1, 1, 10),

(25, 'Sunday', 'BREAKFAST', 1, 1, 6),
(26, 'Sunday', 'LUNCH', 1, 1, 9),
(27, 'Sunday', 'DINNER', 1, 1, 4),
(28, 'Sunday', 'SNACK', 1, 1, 10);
SET IDENTITY_INSERT meal_plan_items OFF;
GO

-- Insert sample favorite foods
INSERT INTO user_favorite_foods (user_id, food_id) VALUES 
(2, 5), (2, 6), (2, 8),
(3, 5), (3, 7), (3, 9),
(4, 1), (4, 2), (4, 4),
(6, 1), (6, 3), (6, 11), (6, 12);
GO

-- Insert sample food reviews
SET IDENTITY_INSERT food_reviews ON;
INSERT INTO food_reviews (id, rating, comment, user_id, food_id) VALUES 
(1, 5, N'Món ăn rất ngon và bổ dưỡng!', 2, 1),
(2, 5, N'Cá hồi tươi ngon, rất đáng thử!', 3, 2),
(3, 4, N'Món chay ngon, phù hợp cho người ăn kiêng', 2, 3),
(4, 5, N'Ức gà nướng rất thơm, măng tây giòn ngon', 6, 4),
(5, 5, N'Phở bò đúng vị truyền thống', 2, 5),
(6, 4, N'Bánh mì giòn ngon, thịt nướng thơm', 3, 6),
(7, 5, N'Cơm tấm sườn nướng rất ngon!', 4, 7),
(8, 4, N'Gỏi cuốn tươi mát, ăn rất nhẹ', 2, 8);
SET IDENTITY_INSERT food_reviews OFF;
GO

-- Insert sample AI recommendations
SET IDENTITY_INSERT ai_recommendations ON;
INSERT INTO ai_recommendations (id, user_id, recommended_food_id, recommendation_type, reason, confidence_score, is_accepted) VALUES 
(1, 2, 1, 'HEALTH_GOAL', N'Phù hợp với mục tiêu giảm cân của bạn', 0.92, 1),
(2, 2, 4, 'PERSONALIZED', N'Dựa trên sở thích món ăn protein cao', 0.88, 1),
(3, 3, 12, 'TRENDING', N'Món ăn đang được yêu thích nhất tuần này', 0.85, 0),
(4, 6, 2, 'PERSONALIZED', N'Phù hợp với chế độ ăn tăng cơ', 0.90, 1),
(5, 6, 11, 'SEASONAL', N'Món ăn phù hợp cho mùa hè', 0.87, 0);
SET IDENTITY_INSERT ai_recommendations OFF;
GO

-- Insert sample user activity logs
SET IDENTITY_INSERT user_activity_logs ON;
INSERT INTO user_activity_logs (id, user_id, activity_type, activity_description) VALUES 
(1, 2, 'LOGIN', N'Đăng nhập vào hệ thống'),
(2, 2, 'VIEW_FOOD', N'Xem chi tiết món Salad Lúa Mạch & Bơ'),
(3, 2, 'ADD_FAVORITE', N'Thêm món Phở Bò vào yêu thích'),
(4, 3, 'LOGIN', N'Đăng nhập vào hệ thống'),
(5, 3, 'CREATE_MEAL_PLAN', N'Tạo kế hoạch ăn kiêng'),
(6, 6, 'LOGIN', N'Đăng nhập vào hệ thống'),
(7, 6, 'VIEW_FOOD', N'Xem chi tiết món Cá Hồi Nướng');
SET IDENTITY_INSERT user_activity_logs OFF;
GO

-- Insert sample shopping lists
SET IDENTITY_INSERT shopping_lists ON;
INSERT INTO shopping_lists (id, name, meal_plan_id, user_id, status) VALUES 
(1, N'Danh sách mua sắm tuần này', 1, 2, 'IN_PROGRESS'),
(2, N'Danh sách ăn kiêng', 2, 3, 'PENDING');
SET IDENTITY_INSERT shopping_lists OFF;
GO

-- Insert sample shopping list items
SET IDENTITY_INSERT shopping_list_items ON;
INSERT INTO shopping_list_items (id, shopping_list_id, ingredient_name, quantity, unit, category, estimated_price, is_purchased) VALUES 
(1, 1, N'Bánh phở', '1', 'kg', N'Tinh bột', 25000, 1),
(2, 1, N'Thịt bò', '500', 'g', N'Thịt', 150000, 1),
(3, 1, N'Rau thơm', '1', N'bó', N'Rau củ', 10000, 0),
(4, 1, N'Giá đỗ', '200', 'g', N'Rau củ', 8000, 0),
(5, 1, N'Bánh mì', '3', N'ổ', N'Bánh', 30000, 1),
(6, 2, N'Cá hồi', '300', 'g', N'Hải sản', 180000, 0),
(7, 2, N'Rau xà lách', '1', N'bó', N'Rau củ', 15000, 0),
(8, 2, N'Bơ', '2', N'quả', N'Trái cây', 40000, 0);
SET IDENTITY_INSERT shopping_list_items OFF;
GO

-- Insert sample notifications
SET IDENTITY_INSERT notifications ON;
INSERT INTO notifications (id, user_id, title, message, type, is_read) VALUES 
(1, 2, N'Kế hoạch ăn mới', N'Kế hoạch ăn tuần này đã được tạo thành công!', 'SUCCESS', 1),
(2, 2, N'Gợi ý món ăn', N'AI đã gợi ý 3 món ăn phù hợp với bạn', 'INFO', 0),
(3, 3, N'Nhắc nhở', N'Đừng quên hoàn thành kế hoạch ăn hôm nay!', 'WARNING', 0),
(4, 6, N'Món ăn mới', N'Có 5 món ăn mới được thêm vào hệ thống', 'INFO', 0);
SET IDENTITY_INSERT notifications OFF;
GO

-- Insert sample system settings
SET IDENTITY_INSERT system_settings ON;
INSERT INTO system_settings (id, setting_key, setting_value, description) VALUES 
(1, 'ai_recommendation_enabled', 'true', N'Bật/tắt tính năng gợi ý AI'),
(2, 'max_meal_plans_per_user', '10', N'Số lượng kế hoạch ăn tối đa mỗi người dùng'),
(3, 'default_servings', '1', N'Số khẩu phần mặc định'),
(4, 'notification_enabled', 'true', N'Bật/tắt thông báo'),
(5, 'maintenance_mode', 'false', N'Chế độ bảo trì hệ thống');
SET IDENTITY_INSERT system_settings OFF;
GO

PRINT 'Seed data inserted successfully!';
PRINT 'Total users: 6';
PRINT 'Total foods: 12';
PRINT 'Total meal plans: 3';
GO
