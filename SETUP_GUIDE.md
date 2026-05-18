# MealMind - Hướng Dẫn Cài Đặt và Sử Dụng

## ✅ Đã Sửa Các Lỗi

### 1. Lỗi Backend Build (500 Error)
**Vấn đề:** Backend không thể khởi động do thiếu biến môi trường JWT_SECRET

**Giải pháp:** Đã thêm giá trị mặc định vào `application.properties`:
- JWT_SECRET
- DB_USERNAME  
- DB_PASSWORD
- OPENAI_API_KEY

### 2. Lỗi Login/Register (400/500 Error)
**Vấn đề:** 
- Password không đủ mạnh (thiếu ký tự đặc biệt)
- Frontend gửi sai format dữ liệu khi register
- User cố login với password không đúng

**Giải pháp:**
- Đã sửa frontend để gửi đúng format JSON
- Thêm validation password ở frontend
- Thêm thông báo lỗi rõ ràng

## 🔐 Yêu Cầu Password

Khi đăng ký tài khoản mới, password phải đáp ứng các yêu cầu sau:

✅ **Tối thiểu 8 ký tự**
✅ **Có chữ HOA** (A-Z)
✅ **Có chữ thường** (a-z)  
✅ **Có số** (0-9)
✅ **Có ký tự đặc biệt** (!@#$%^&*()_+-=[]{}; ':"\\|,.<>/?)

### Ví dụ Password Hợp Lệ:
- `Admin@123456`
- `Test@123456`
- `MyPass#2024`
- `Secure!Pass123`

### Ví dụ Password KHÔNG Hợp Lệ:
- `Admin123` ❌ (thiếu ký tự đặc biệt)
- `admin@123` ❌ (thiếu chữ HOA)
- `ADMIN@123` ❌ (thiếu chữ thường)
- `Admin@abc` ❌ (thiếu số)
- `Admin@1` ❌ (quá ngắn, dưới 8 ký tự)

## 🚀 Hướng Dẫn Sử Dụng

### 1. Đăng Ký Tài Khoản Mới

1. Mở trình duyệt và truy cập: `http://localhost:5173`
2. Click vào "Đăng ký ngay"
3. Điền thông tin:
   - **Họ tên**: Tên đầy đủ của bạn
   - **Email**: Email hợp lệ (chưa được đăng ký)
   - **Mật khẩu**: Phải đáp ứng yêu cầu trên (ví dụ: `MyPass@123`)
   - **Xác nhận mật khẩu**: Nhập lại mật khẩu
4. Đồng ý với điều khoản dịch vụ
5. Click "Đăng ký tài khoản"

### 2. Đăng Nhập

1. Nhập email và password đã đăng ký
2. Click "Đăng nhập"
3. Nếu là ADMIN, bạn sẽ được chuyển đến `/admin`
4. Nếu là USER, bạn sẽ được chuyển đến trang chủ `/`

### 3. Tạo Tài Khoản Admin

Để tạo tài khoản admin, bạn có 2 cách:

#### Cách 1: Đăng ký qua API (Khuyến nghị)
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "Admin@123456"
  }'
```

Sau đó cập nhật role trong database:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

#### Cách 2: Tạo trực tiếp trong Database
```sql
-- Tạo user mới với role ADMIN
INSERT INTO users (name, email, password, role, status, created_at)
VALUES (
  'Admin User',
  'admin@example.com',
  '$2a$10$...',  -- Password đã hash (sử dụng BCrypt)
  'ADMIN',
  'ACTIVE',
  GETDATE()
);
```

## 🔧 Khắc Phục Sự Cố

### Lỗi "Invalid password" khi login
**Nguyên nhân:** Password không khớp với password đã lưu trong database

**Giải pháp:**
1. Đảm bảo bạn nhập đúng password đã đăng ký
2. Nếu quên password, cần reset trong database hoặc đăng ký tài khoản mới

### Lỗi "Email already exists" khi register
**Nguyên nhân:** Email đã được đăng ký trước đó

**Giải pháp:**
1. Sử dụng email khác
2. Hoặc login với email đã tồn tại

### Lỗi 403 Forbidden khi truy cập API
**Nguyên nhân:** Chưa đăng nhập hoặc token hết hạn

**Giải pháp:**
1. Đăng nhập lại
2. Kiểm tra token trong localStorage

## 📝 Ghi Chú

- Backend đang chạy trên: `http://localhost:8080`
- Frontend đang chạy trên: `http://localhost:5173`
- Database: SQL Server trên port `1433`

## 🎯 Tài Khoản Test

Bạn có thể tạo tài khoản test với thông tin sau:

**User thường:**
- Email: `user@example.com`
- Password: `User@123456`

**Admin:**
- Email: `admin@example.com`  
- Password: `Admin@123456`

(Lưu ý: Cần tạo tài khoản này trước khi sử dụng)

## 🆘 Liên Hệ Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console của browser (F12)
2. Kiểm tra log của backend
3. Đảm bảo database đang chạy
4. Đảm bảo tất cả service đang chạy (backend, frontend, database)
