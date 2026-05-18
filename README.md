MealMind - Hệ Thống Lập Kế Hoạch Bữa Ăn Thông Minh
Ứng dụng web full-stack cho việc lập kế hoạch bữa ăn cá nhân hóa với gợi ý từ AI và theo dõi dinh dưỡng.

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-2019-red.svg)](https://www.microsoft.com/sql-server)


Mục Lục
- Tổng Quan
- Tính Năng
- Công Nghệ Sử Dụng
- Kiến Trúc Hệ Thống
- Thiết Kế Database (ERD)
- API Documentation
- Hướng Dẫn Cài Đặt
- Screenshots
- Thách Thức & Giải Pháp
- Tính Năng Tương Lai
- Liên Hệ


Tổng Quan
MealMind là ứng dụng web hiện đại được thiết kế để đơn giản hóa việc lập kế hoạch bữa ăn và quản lý dinh dưỡng. Ứng dụng tận dụng công nghệ AI để cung cấp gợi ý món ăn cá nhân hóa dựa trên sở thích, mục tiêu sức khỏe và hạn chế chế độ ăn của người dùng.
Điểm Nổi Bật:
- Gợi Ý Thông Minh từ AI sử dụng OpenAI API
- Xác Thực Bảo Mật với JWT và Spring Security
- Dashboard Admin Toàn Diện để quản lý nội dung
- Cơ Sở Dữ Liệu 500+ Công Thức với thông tin dinh dưỡng chi tiết
- Thiết Kế Responsivecho trải nghiệm người dùng mượt mà

Tính Năng
Dành Cho Người Dùng:
- Xác Thực & Phân Quyền
  - Đăng ký và đăng nhập bảo mật với JWT tokens
  - Mã hóa mật khẩu bằng BCrypt
  - Quản lý hồ sơ với các chỉ số sức khỏe

- Lập Kế Hoạch Bữa Ăn
  - Tạo kế hoạch bữa ăn theo tuần (Sáng, Trưa, Tối, Snack)
  - Lên lịch bữa ăn dễ dàng
  - Tự động tính toán calories và dinh dưỡng
  - Chỉnh sửa và theo dõi hoàn thành bữa ăn

- Khám Phá Món Ăn
  - Duyệt 500+ công thức với bộ lọc (danh mục, ẩm thực, loại chế độ ăn)
  - Trang chi tiết công thức với nguyên liệu và hướng dẫn
  - Đánh giá và nhận xét công thức
  - Lưu món ăn yêu thích

-Gợi Ý AI
  - Đề xuất món ăn cá nhân hóa dựa trên:
    - Mục tiêu sức khỏe (giảm cân, tăng cơ, duy trì)
    - Sở thích ăn uống (chay, thuần chay, keto, v.v.)
    - Dị ứng và hạn chế
    - Mục tiêu calories

Dành Cho Quản Trị Viên:
- Quản Lý Người Dùng
  - Xem, tạo, sửa và xóa người dùng
  - Phân quyền (USER/ADMIN)
  - Theo dõi hoạt động người dùng và kế hoạch bữa ăn

- Quản Lý Món Ăn
  - Thao tác CRUD cho công thức
  - Quản lý nguyên liệu và hướng dẫn
  - Cập nhật thông tin dinh dưỡng
  - Xuất bản/lưu trữ công thức

- Dashboard Phân Tích
  - Thống kê thời gian thực (tổng người dùng, món ăn, kế hoạch)
  - Chỉ số tương tác người dùng
  - Tổng quan hệ thống

- Cài Đặt
  - Quản lý hồ sơ admin
  - Chức năng đổi mật khẩu

Công Nghệ Sử Dụng
Backend
 - Java 17: Ngôn ngữ lập trình chính được sử dụng để xây dựng toàn bộ backend system.
 - Spring Boot 3.2: Framework chính hỗ trợ phát triển RESTful APIs, quản lý dependency và cấu hình  ứng dụng nhanh chóng.
 - Spring Security: Triển khai xác thực và phân quyền người dùng, bảo vệ các API endpoints và hỗ trợ RBAC (Role-Based Access Control).
 - Spring Data JPA: Hỗ trợ thao tác cơ sở dữ liệu theo mô hình ORM thông qua Repository Pattern.
 - JWT (jjwt 0.11.5): Áp dụng cơ chế xác thực stateless bằng token để quản lý phiên đăng nhập người dùng.
 - Hibernate: ORM framework dùng để ánh xạ giữa Java Objects và Database Tables.
 - Maven: Công cụ quản lý dependencies, build project và tự động hóa quá trình phát triển ứng dụng.
 - Lombok: Giảm boilerplate code bằng cách tự động tạo getter, setter, constructor và utility methods.

Frontend
 - React 18: Thư viện JavaScript được sử dụng để xây dựng giao diện người dùng theo mô hình component-based architecture.
 - React Router DOM 6: Hỗ trợ định tuyến phía client (client-side routing), cho phép điều hướng giữa các trang mà không cần reload lại ứng dụng.
 - Axios: HTTP client dùng để gửi và xử lý các API requests giữa frontend và backend.
 - Vite: Build tool và development server giúp tăng tốc độ khởi động dự án và tối ưu quá trình phát triển frontend.
 - CSS3: Được sử dụng để thiết kế giao diện, responsive layout và cải thiện trải nghiệm người dùng.

Database
 - Microsoft SQL Server: Hệ quản trị cơ sở dữ liệu chính được sử dụng để lưu trữ và quản lý dữ liệu của hệ thống, hỗ trợ transaction management, indexing và tối ưu truy vấn.
 - H2 Database: Cơ sở dữ liệu in-memory được sử dụng cho quá trình testing và development, giúp kiểm thử nhanh mà không cần cấu hình SQL Server đầy đủ.



Tích Hợp AI
 - OpenAI API: Được tích hợp để tạo các gợi ý món ăn và kế hoạch bữa ăn cá nhân hóa dựa trên mục tiêu sức khỏe, sở thích ăn uống và nhu cầu dinh dưỡng của người dùng.
 - Spring WebFlux: Reactive framework được sử dụng để thực hiện các HTTP requests bất đồng bộ tới OpenAI API, hỗ trợ xử lý non-blocking và cải thiện hiệu suất khi tích hợp external services.


Kiến Trúc Hệ Thống
 - Client Layer: Frontend sử dụng React SPA, React Router và Hooks để xây dựng giao diện và quản lý state.
 - Presentation Layer: Các Spring MVC Controllers tiếp nhận request và trả response thông qua REST API.
 - Security Layer: Spring Security kết hợp JWT Authentication Filter để xác thực người dùng và phân quyền RBAC.
 - Business Logic Layer: Các Service classes xử lý business logic như authentication, meal planning và AI recommendation.
 - Persistence Layer: Spring Data JPA Repositories thực hiện thao tác truy cập dữ liệu theo Repository Pattern.
 - Data Layer: Microsoft SQL Server lưu trữ dữ liệu với hệ thống bảng chuẩn hóa, indexes và constraints.
 - External Services: Tích hợp OpenAI API để tạo gợi ý món ăn và kế hoạch bữa ăn thông minh bằng AI.



Luồng Xử Lý Request:
Luồng Đăng Nhập:
1. User gửi thông tin đăng nhập → React Form
2. Axios POST → /api/auth/login
3. AuthController nhận request
4. AuthService xác thực thông tin
5. JwtService tạo JWT token
6. Trả về response với token + dữ liệu user
7. Frontend lưu token vào localStorage
8. Các request tiếp theo gửi kèm token trong Authorization header
9. JwtAuthenticationFilter xác thực token
10. Request được chuyển đến controller


Thiết Kế Database (ERD)
- Cơ sở dữ liệu của MealMind được thiết kế theo mô hình quan hệ và chuẩn hóa nhằm đảm bảo tính toàn vẹn dữ liệu và tối ưu hiệu suất truy vấn.
   - USERS: Lưu trữ thông tin người dùng như tên, email, mật khẩu, vai trò và dữ liệu sức khỏe. Một user có thể tạo nhiều kế hoạch bữa ăn và đánh giá món ăn.
   - MEAL_PLANS: Quản lý kế hoạch bữa ăn theo tuần của người dùng, bao gồm thời gian bắt đầu, kết thúc và trạng thái kế hoạch.
   - MEAL_PLAN_ITEMS: Lưu chi tiết từng bữa ăn trong kế hoạch như món ăn, loại bữa ăn, số lượng khẩu phần và trạng thái hoàn thành.
   - FOODS: Chứa thông tin công thức món ăn như calories, dinh dưỡng, danh mục, hình ảnh và đánh giá.
   - INGREDIENTS: Lưu danh sách nguyên liệu của từng món ăn cùng số lượng và đơn vị đo lường.
   - INSTRUCTIONS: Lưu các bước hướng dẫn nấu ăn theo thứ tự thực hiện.
   - REVIEWS: Cho phép người dùng đánh giá và nhận xét các món ăn trong hệ thống.
   - USER_FAVORITE_FOODS: Bảng trung gian thể hiện mối quan hệ nhiều-nhiều giữa users và foods cho tính năng yêu thích món ăn.
   - AI_RECOMMENDATIONS: Lưu các gợi ý món ăn được tạo từ AI dựa trên nhu cầu và mục tiêu dinh dưỡng của người dùng.

Các Bảng Chính:
 - users (~100 records): Lưu thông tin tài khoản, vai trò và hồ sơ sức khỏe của người dùng.
 - foods (500+ records): Lưu danh sách công thức món ăn cùng thông tin dinh dưỡng và phân loại món ăn.
 - ingredients (3000+ records): Lưu nguyên liệu chi tiết cho từng công thức món ăn.
 - food_instructions (2000+ records): Lưu các bước hướng dẫn nấu ăn theo thứ tự thực hiện.
 - meal_plans (~200 records): Quản lý kế hoạch bữa ăn theo tuần của người dùng.
 - meal_plan_items (~1400 records): Lưu chi tiết từng bữa ăn trong mỗi kế hoạch như món ăn, loại bữa ăn và khẩu phần.
 - food_reviews (~300 records): Lưu đánh giá và nhận xét của người dùng về các món ăn.
 - user_favorite_foods (~500 records): Lưu danh sách món ăn yêu thích của người dùng theo quan hệ nhiều-nhiều (M:N).

Đặc Điểm Database:
- ✅ Chuẩn hóa đến 3NF
- ✅ Ràng buộc khóa ngoại với cascade operations
- ✅ Indexes trên các cột thường xuyên truy vấn
- ✅ Triggers để tự động cập nhật timestamp
- ✅ Check constraints để xác thực dữ liệu

API Documentation
Authentication Endpoints
- Đăng Ký User
POST /api/auth/register
Content-Type: application/json

{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "password": "MatKhau123!"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "role": "USER"
  }
}

- Đăng Nhập
POST /api/auth/login
Content-Type: application/json

{
  "email": "nguyenvana@example.com",
  "password": "MatKhau123!"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}

Food Endpoints
- Lấy Tất Cả Món Ăn
GET /api/foods
Response: 200 OK
[
  {
    "id": 1,
    "name": "Salad Gà Nướng",
    "calories": 350,
    "category": "Salad",
    "cuisine": "Âu",
    "rating": 4.5,
    ...
  }
]


- Lấy Chi Tiết Món Ăn
GET /api/foods/{id}
Response: 200 OK
{
  "id": 1,
  "name": "Salad Gà Nướng",
  "ingredients": [...],
  "instructions": [...],
  "nutrition": {...}
}

- Meal Plan Endpoints
Tạo Kế Hoạch Bữa Ăn
POST /api/meal-plans
Authorization: Bearer {token}
Content-Type: application/json
{
  "name": "Kế Hoạch Tuần Của Tôi",
  "weekStartDate": "2024-05-06",
  "weekEndDate": "2024-05-12",
  "items": [
    {
      "dayOfWeek": "Monday",
      "mealType": "BREAKFAST",
      "foodId": 1,
      "servings": 1
    }
  ]
}
Response: 201 Created

- Lấy Kế Hoạch Bữa Ăn Của User
GET /api/meal-plans
Authorization: Bearer {token}

Response: 200 OK


- AI Recommendation Endpoints
Tạo Kế Hoạch Bữa Ăn Với AI
POST /api/ai/generate-meal-plan
Authorization: Bearer {token}
Content-Type: application/json

{
  "dietaryPreference": "vegetarian",
  "calorieTarget": 2000,
  "mealsPerDay": 3,
  "duration": 7
}

Response: 200 OK
{
  "mealPlan": {...},
  "recommendations": [...]
}

- Admin Endpoints
- Lấy Tất Cả Users (Chỉ Admin)

GET /api/admin/users
Authorization: Bearer {admin-token}

Response: 200 OK

- Thống Kê Dashboard

GET /api/admin/stats
Authorization: Bearer {admin-token}

Response: 200 OK
{
  "totalUsers": 150,
  "totalFoods": 523,
  "totalMealPlans": 234,
  "totalOrders": 0
}

- Mã Phản Hồi API
| Mã  |                Ý Nghĩa                   |
| 200 | Thành công                               |
| 201 | Đã tạo                                   |
| 400 | Yêu cầu không hợp lệ (lỗi validation)    |
| 401 | Chưa xác thực (token không hợp lệ/thiếu) |
| 403 | Cấm (không đủ quyền)                     |
| 404 | Không tìm thấy                           |
| 500 | Lỗi máy chủ nội bộ                       |

Hướng Dẫn Cài Đặt
- Yêu Cầu Hệ Thống
  - Java 17 trở lên
  - Node.js 16+ và npm
  - Microsoft SQL Server (hoặc dùng H2 cho development)
  - Maven 3.6+
- Git

## ⚠️ QUAN TRỌNG: Yêu Cầu Password

Khi đăng ký tài khoản mới, password phải đáp ứng TẤT CẢ các điều kiện sau:
- ✅ **Tối thiểu 8 ký tự**
- ✅ **Có chữ HOA** (A-Z)
- ✅ **Có chữ thường** (a-z)
- ✅ **Có số** (0-9)
- ✅ **Có ký tự đặc biệt** (!@#$%^&*()_+-=[]{}; ':"\\|,.<>/?)

### Ví dụ Password Hợp Lệ:
- ✅ `Admin@123456`
- ✅ `Test@123456`
- ✅ `MyPass#2024`
- ✅ `Secure!Pass123`

### Ví dụ Password KHÔNG Hợp Lệ:
- ❌ `Admin123` (thiếu ký tự đặc biệt)
- ❌ `admin@123` (thiếu chữ HOA)
- ❌ `ADMIN@123` (thiếu chữ thường)
- ❌ `Admin@abc` (thiếu số)
- ❌ `Admin@1` (quá ngắn)

## 🎯 Tài Khoản Test Có Sẵn

Sau khi cài đặt xong, bạn có thể sử dụng các tài khoản test sau:

**User thường:**
- Email: `testuser@example.com`
- Password: `Test@123456`

**Hoặc tạo tài khoản mới** tại `http://localhost:5173` với password đáp ứng yêu cầu trên.

Cài Đặt Backend
1. Clone repository
   git clone https://github.com/ThanhhDaoo/MealMind.git
   cd MealMind

2. Cấu hình Database
   Tạo database SQL Server:
CREATE DATABASE mealmind_db;

3. Cập nhật application.properties
   Copy file mẫu:
   cd backend/src/main/resources
   cp application.properties.example application.properties
   Chỉnh sửa `application.properties`:

- Cấu hình Database
   spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=mealmind_db;encrypt=true;trustServerCertificate=true
   spring.datasource.username=your_username
   spring.datasource.password=your_password
- Cấu hình JWT
   jwt.secret=your-secret-key-here-minimum-256-bits
   jwt.expiration=86400000
- OpenAI API (tùy chọn)
   openai.api.key=your-openai-api-key

4. Chạy Database Schema
- Thực thi schema.sql trong SQL Server Management Studio hoặc:
   sqlcmd -S localhost -d mealmind_db -i database/schema.sql
   sqlcmd -S localhost -d mealmind_db -i database/seed.sql

5. Build và Chạy Backend
   cd backend
   mvn clean install
   mvn spring-boot:run
   Backend sẽ chạy tại `http://localhost:8080`

Cài Đặt Frontend
1. Cài đặt Dependencies
   cd frontend
   npm install

2. Cấu hình API Endpoint=
   Chỉnh sửa `frontend/src/main.jsx` hoặc tạo `.env`:
   VITE_API_URL=http://localhost:8080

3. Chạy Frontend
   npm run dev
   Frontend sẽ chạy tại `http://localhost:5173`
   Tài Khoản Admin Mặc Định
   Sau khi chạy seed.sql:
   Email: admin@mealmind.com
   Password: Admin123!

Kiểm Tra Ứng Dụng
1. Mở trình duyệt: `http://localhost:5173`
2. Đăng ký user mới hoặc đăng nhập bằng tài khoản admin
3. Khám phá các tính năng:
   - Duyệt món ăn
   - Tạo kế hoạch bữa ăn
   - Thử gợi ý AI (cần OpenAI API key)
   - Truy cập admin dashboard (chỉ tài khoản admin)

Xử Lý Sự Cố
- Lỗi Kết Nối Database:
  - Kiểm tra SQL Server đang chạy
  - Kiểm tra connection string trong application.properties
  - Đảm bảo database đã tồn tại

Port Đã Được Sử Dụng:
  Backend (thay đổi trong application.properties)
  server.port=8081

  Frontend (thay đổi trong vite.config.js)
  server: { port: 5174 }

Vấn Đề CORS:
- Xác minh frontend URL trong SecurityConfig.java
- Kiểm tra cấu hình CORS trong controllers

Thách Thức & Giải Pháp
  Thách Thức 1: Vấn Đề N+1 Query
   - Vấn đề: Tải kế hoạch bữa ăn với các items gây ra nhiều truy vấn database, dẫn đến hiệu suất kém.
   -Giải pháp:
     - Triển khai `@Transactional(readOnly = true)` trên các service methods
     - Sử dụng eager fetching một cách chiến lược với `@EntityGraph`
     - Chuyển đổi entities sang DTOs ngay lập tức để tránh vấn đề lazy loading
     - Kết quả: Giảm số lượng query từ 50+ xuống còn 2-3 queries mỗi request
@Transactional(readOnly = true)
public List<MealPlanDTO> getUserMealPlans(Long userId) {
    List<MealPlan> plans = mealPlanRepository.findByUserId(userId);
    // Chuyển sang DTO ngay lập tức
    return plans.stream()
        .map(this::convertToDTO)
        .collect(Collectors.toList());
}

  Thách Thức 2: Bảo Mật JWT Token
   - Vấn đề:Cần xác thực bảo mật mà không cần quản lý session.
   - Giải pháp:
    - Triển khai JWT với HMAC-SHA256 signing
    - Tạo custom `JwtAuthenticationFilter` để xác thực token
    - Sử dụng annotations `@PreAuthorize` cho bảo mật cấp method
    - Triển khai cơ chế hết hạn và refresh token
    - Lưu trữ tokens an toàn trong localStorage
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                   HttpServletResponse response, 
                                   FilterChain filterChain) {
        String token = extractToken(request);
        if (token != null && jwtService.validateToken(token)) {
            // Đặt authentication vào SecurityContext
        }
        filterChain.doFilter(request, response);
    }
}

  Thách Thức 3: Chỉnh Sửa Kế Hoạch Bữa Ăn Phức Tạp
    -Vấn đề:Người dùng cần chỉnh sửa kế hoạch bữa ăn mà không mất dữ liệu hoặc tạo ra sự không nhất quán.
    -Giải pháp:
      - Triển khai optimistic locking với version fields
      - Tạo transaction boundaries cho atomic updates
      - Thêm validation để ngăn chặn orphaned records
      - Triển khai cascade operations cẩn thận để bảo toàn tính toàn vẹn dữ liệu
@Transactional
public MealPlanDTO updateMealPlan(Long id, MealPlanDTO dto) {
    MealPlan existing = mealPlanRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy kế hoạch"));
    
    // Cập nhật trong transaction để đảm bảo tính nguyên tử
    existing.setName(dto.getName());
    existing.getItems().clear();
    existing.getItems().addAll(convertItems(dto.getItems()));
    
    return convertToDTO(mealPlanRepository.save(existing));
}

  Thách Thức 4: Tích Hợp OpenAI API
    -Vấn đề:Tích hợp dịch vụ AI bên ngoài với xử lý lỗi và rate limiting phù hợp.
    -Giải pháp:
      - Sử dụng Spring WebFlux cho reactive HTTP calls
      - Triển khai retry logic với exponential backoff
      - Thêm fallback responses khi API không khả dụng
      - Cache các gợi ý phổ biến để giảm API calls
      - Triển khai request/response logging để debug
public Mono<String> generateRecommendation(MealPlanGenerationRequest request) {
    return webClient.post()
        .uri("/v1/chat/completions")
        .bodyValue(buildPrompt(request))
        .retrieve()
        .bodyToMono(String.class)
        .retryWhen(Retry.backoff(3, Duration.ofSeconds(2)))
        .onErrorResume(e -> Mono.just(getFallbackRecommendation()));
}

  Thách Thức 5: Cấu Hình CORS
    -Vấn đề: Frontend và backend trên các ports khác nhau gây ra lỗi CORS.
    -Giải pháp:
      - Cấu hình CORS trong Spring Security
      - Thêm allowed origins động
      - Đặt headers phù hợp cho credentials
      - Test với nhiều frontend ports cho development
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList(
        "http://localhost:5173", 
        "http://localhost:5174"
    ));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    config.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}

  Thách Thức 6: Validation Mật Khẩu
    - Vấn đề: Cần yêu cầu mật khẩu mạnh mà không dùng thư viện bên ngoài.
    - Giải pháp:
      - Tạo custom annotation `@StrongPassword`
      - Triển khai `ConstraintValidator` với regex patterns
      - Thêm thông báo lỗi rõ ràng cho người dùng
      - Validate ở cả frontend và backend
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StrongPasswordValidator.class)
public @interface StrongPassword {
    String message() default "Mật khẩu phải chứa ít nhất 8 ký tự, " +
                            "một chữ hoa, một chữ thường, một số và một ký tự đặc biệt";
}

Tính Năng Tương Lai
-Tính Năng Dự Kiến:
  - Ứng Dụng Mobile - Phiên bản React Native cho iOS/Android
  - Tạo Danh Sách Mua Sắm - Tự động tạo danh sách mua hàng từ kế hoạch bữa ăn
  - Theo Dõi Dinh Dưỡng - Theo dõi calories và macro hàng ngày
  - Tính Năng Xã Hội- Chia sẻ công thức và kế hoạch với bạn bè
  - Import Công Thức - Import công thức từ URLs
  - Chế Độ Meal Prep- Gợi ý nấu ăn hàng loạt
  - Tích Hợp Fitness Apps - Đồng bộ với Apple Health, Google Fit
  - Hỗ Trợ Đa Ngôn Ngữ - i18n cho người dùng toàn cầu
  - Dark Mode - Tùy chỉnh giao diện
  - Thông Báo Email- Nhắc nhở bữa ăn và tóm tắt tuần
  - Phân Tích Nâng Cao - Xu hướng dinh dưỡng và insights
  - Video Hướng Dẫn - Video nấu ăn nhúng

Cải Tiến Kỹ Thuật:
- Triển khai Redis caching cho dữ liệu thường xuyên truy cập
- Thêm Elasticsearch cho tìm kiếm công thức nâng cao
- Triển khai WebSocket cho thông báo real-time
- Thêm unit và integration tests toàn diện (JUnit, Mockito)
- Thiết lập CI/CD pipeline (GitHub Actions)
- Containerize với Docker
- Deploy lên cloud (AWS/Azure)
- Triển khai API rate limiting
- Thêm API documentation với Swagger/OpenAPI
- Triển khai logging với ELK stack

Kết Quả Học Tập
Qua việc xây dựng dự án này, tôi đã có kinh nghiệm thực tế với:
Backend Development:
✅ Kiến trúc ứng dụng Spring Boot và best practices  
✅ Thiết kế và triển khai RESTful API  
✅ Spring Security với JWT authentication  
✅ JPA/Hibernate ORM và quan hệ database  
✅ Quản lý transaction và tối ưu hóa  
✅ Xử lý exception và validation  
✅ Tích hợp với external APIs (OpenAI)  

Frontend Development:
✅ Kiến trúc component React và hooks  
✅ Client-side routing với React Router  
✅ Quản lý state và data flow  
✅ HTTP requests với Axios  
✅ Xử lý form và validation  
✅ Thiết kế CSS responsive  

Database Design:
✅ Thiết kế schema database chuẩn hóa  
✅ Quan hệ phức tạp (1:1, 1:N, N:M)  
✅ SQL Server triggers và indexes  
✅ Kỹ thuật tối ưu hóa query  

Software Engineering:
✅ Phát triển ứng dụng full-stack  
✅ Git version control và branching  
✅ Giải quyết vấn đề và debugging  
✅ Tổ chức code và clean code principles  
✅ Best practices về bảo mật  

Liên Hệ
Developer:Thanh Dao  
Email: tranthanhdao82@gmail.com  
GitHub: https://github.com/ThanhhDaoo
Zalo: 0362625218

License
Dự án này được tạo ra cho mục đích học tập và portfolio.

⭐ Nếu bạn thấy dự án này thú vị, hãy cho một star nhé! ⭐

