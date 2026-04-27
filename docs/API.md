# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "role": "USER"
  }
}
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123"
}
```

## Foods

### Get All Foods
```http
GET /foods?page=0&size=10&category=Keto&search=bò
Authorization: Bearer {token}
```

### Get Food by ID
```http
GET /foods/{id}
Authorization: Bearer {token}
```

### Create Food (Admin only)
```http
POST /foods
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Bò Xào Cà Chua",
  "description": "Món bò xào ngon",
  "calories": 350,
  "prepTime": 10,
  "cookTime": 15,
  "totalTime": 25,
  "servings": 2,
  "difficulty": "Easy",
  "category": "Keto",
  "dietType": "Low Carb",
  "protein": 35.0,
  "carbs": 12.0,
  "fat": 18.0
}
```

### Update Food (Admin only)
```http
PUT /foods/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  ...
}
```

### Delete Food (Admin only)
```http
DELETE /foods/{id}
Authorization: Bearer {token}
```

## AI Recommendations

### Get Recommendations
```http
POST /ai/recommendations
Authorization: Bearer {token}
Content-Type: application/json

{
  "ingredients": "bò, cà chua, hành tây",
  "dietaryRestrictions": "Dưới 15 phút, ít dầu mỡ",
  "mealType": "Keto"
}
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Bò Xào Cà Chua",
    "description": "...",
    "calories": 350,
    "totalTime": 12,
    "protein": 35.0,
    "carbs": 12.0,
    "dietType": "Keto",
    "imageUrl": "https://..."
  },
  ...
]
```

## Meal Plans

### Get Meal Plans
```http
GET /meal-plans?date=2024-04-27
Authorization: Bearer {token}
```

### Generate Meal Plan
```http
POST /meal-plans/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "weekStartDate": "2024-04-27",
  "dietaryPreferences": ["Keto", "High Protein"]
}
```

### Update Meal Plan
```http
PUT /meal-plans/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Plan",
  ...
}
```

### Delete Meal Plan
```http
DELETE /meal-plans/{id}
Authorization: Bearer {token}
```

## Admin

### Get Dashboard Stats
```http
GET /admin/dashboard/stats
Authorization: Bearer {token}
```

### Get All Users (Admin only)
```http
GET /admin/users?page=0&size=10
Authorization: Bearer {token}
```

### Update User (Admin only)
```http
PUT /admin/users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@email.com",
  "role": "USER",
  "status": "ACTIVE"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "timestamp": "2024-04-27T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed"
}
```

### 401 Unauthorized
```json
{
  "timestamp": "2024-04-27T10:00:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "JWT token expired"
}
```

### 403 Forbidden
```json
{
  "timestamp": "2024-04-27T10:00:00",
  "status": 403,
  "error": "Forbidden",
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "timestamp": "2024-04-27T10:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "timestamp": "2024-04-27T10:00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An error occurred"
}
```
