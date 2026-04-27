# Deployment Guide

## Production Deployment

### Prerequisites
- Java 17+
- Node.js 16+
- SQL Server
- Domain name (optional)
- SSL certificate (recommended)

## Backend Deployment

### 1. Build JAR file
```bash
cd backend
mvn clean package -DskipTests
```

JAR file sẽ được tạo tại: `target/meal-mind-backend-0.0.1-SNAPSHOT.jar`

### 2. Configure Production Properties

Tạo `application-prod.properties`:
```properties
# Database
spring.datasource.url=jdbc:sqlserver://your-db-server:1433;databaseName=mealmind_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Server
server.port=8080

# JWT
app.jwt.secret=${JWT_SECRET}
app.jwt.expiration=86400000

# OpenAI
openai.api.key=${OPENAI_API_KEY}

# CORS
app.cors.allowed-origins=https://yourdomain.com

# Logging
logging.level.com.mealapp=INFO
logging.file.name=/var/log/mealmind/application.log
```

### 3. Run with Production Profile
```bash
java -jar target/meal-mind-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=prod \
  -Dserver.port=8080
```

### 4. Using systemd (Linux)

Tạo `/etc/systemd/system/mealmind.service`:
```ini
[Unit]
Description=MealMind Backend
After=network.target

[Service]
Type=simple
User=mealmind
WorkingDirectory=/opt/mealmind
ExecStart=/usr/bin/java -jar /opt/mealmind/meal-mind-backend.jar --spring.profiles.active=prod
Restart=on-failure
RestartSec=10

Environment="DB_USERNAME=your_username"
Environment="DB_PASSWORD=your_password"
Environment="JWT_SECRET=your_jwt_secret"
Environment="OPENAI_API_KEY=your_openai_key"

[Install]
WantedBy=multi-user.target
```

Enable và start service:
```bash
sudo systemctl enable mealmind
sudo systemctl start mealmind
sudo systemctl status mealmind
```

## Frontend Deployment

### 1. Build Production Bundle
```bash
cd frontend
npm run build
```

Build output sẽ ở thư mục `dist/`

### 2. Deploy to Nginx

Cấu hình Nginx (`/etc/nginx/sites-available/mealmind`):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/mealmind;
    index index.html;

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/mealmind /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Docker Deployment

### Backend Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
```

### Frontend Dockerfile
```dockerfile
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_USERNAME=${DB_USERNAME}
      - DB_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: mcr.microsoft.com/mssql/server:2019-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=${DB_PASSWORD}
    ports:
      - "1433:1433"
    volumes:
      - db-data:/var/opt/mssql

volumes:
  db-data:
```

Run:
```bash
docker-compose up -d
```

## Environment Variables

Tạo `.env` file:
```bash
# Database
DB_USERNAME=sa
DB_PASSWORD=YourStrongPassword123
DB_HOST=localhost
DB_PORT=1433
DB_NAME=mealmind_db

# JWT
JWT_SECRET=your-256-bit-secret-key-here

# OpenAI
OPENAI_API_KEY=sk-your-api-key-here

# App
NODE_ENV=production
```

## Monitoring

### Health Check Endpoint
```bash
curl http://localhost:8080/actuator/health
```

### Logs
```bash
# Systemd
sudo journalctl -u mealmind -f

# Docker
docker-compose logs -f backend
```

## Backup

### Database Backup
```bash
# SQL Server
sqlcmd -S localhost -U SA -P YourPassword \
  -Q "BACKUP DATABASE mealmind_db TO DISK='/backup/mealmind_$(date +%Y%m%d).bak'"
```

### Automated Backup Script
```bash
#!/bin/bash
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
sqlcmd -S localhost -U SA -P $DB_PASSWORD \
  -Q "BACKUP DATABASE mealmind_db TO DISK='$BACKUP_DIR/db_$DATE.bak'"

# Keep only last 7 days
find $BACKUP_DIR -name "db_*.bak" -mtime +7 -delete
```

## Security Checklist

- [ ] Change default passwords
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure firewall
- [ ] Set up rate limiting
- [ ] Enable CORS properly
- [ ] Secure API keys
- [ ] Regular security updates
- [ ] Monitor logs
- [ ] Set up backups

## Performance Optimization

### Backend
- Enable connection pooling
- Configure caching
- Optimize database queries
- Use CDN for static assets

### Frontend
- Enable gzip compression
- Minify assets
- Lazy load images
- Use CDN

## Troubleshooting

### Backend won't start
```bash
# Check logs
sudo journalctl -u mealmind -n 100

# Check port
sudo netstat -tulpn | grep 8080

# Check Java version
java -version
```

### Database connection failed
```bash
# Test connection
sqlcmd -S localhost -U SA -P YourPassword

# Check SQL Server status
sudo systemctl status mssql-server
```

### Frontend 404 errors
- Check Nginx configuration
- Verify build output
- Check file permissions
