# Node.js Authentication Uygulaması

Bu proje, Node.js kullanarak kullanıcı kimlik doğrulama işlemlerini gerçekleştiren bir uygulamadır. Kullanıcı kayıt olma, giriş yapma, şifre sıfırlama ve e-posta doğrulama gibi temel özellikleri içerir.​ Her endpointte validasyon işlemi yapılarak best practicelere uygun bir authentication uygulaması kullanıcılara sunulur.

## Teknolojiler

- Node.js
- Express.js
- Prisma
- PostgreSQL
- Nodemailer
- Multer
- Bcrypt
- Dotenv
- Joi
- Jsonwebtoken

## Özellikler

- **Kullanıcı Kaydı**: Yeni kullanıcılar sisteme kayıt olabilir.​ Kayıt olduktan sonra maile gelen kod ile hesabını `verify` edebilir.
- **Kullanıcı Girişi**: `verify` olan kullanıcılar e-posta ve şifre ile giriş yapabilir. Eğer hesap bloklanmamış bir hesapsa giriş yapma işlemi başarılı olur.​
- **Şifre Sıfırlama**: Şifresini unutan kullanıcılar, e-posta yoluyla şifrelerini sıfırlayabilir veya bloklanmış bir hesabı tekrar aktif hale getirmek için yine bu özellik kullanılabilir.​
- **E-posta Doğrulama**: Kullanıcıların e-posta adreslerini doğrulamaları için sistem tarafından bir doğrulama kodu gönderilir.​
- **Hesap Kilitleme**: 5 kez hatalı giriş yapan kullanıcıların hesapları kilitlenir.

## Kurulum

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/cKubilayKaya/node-auth-app.git
cd node-auth-app
```

### 2. Gerekli Paketleri Yükleyin

Proje dizinine gidip gerekli bağımlılıkları yüklemek için şu komutu çalıştırın:

```bash
npm install
```

### 3. .env Dosyasını Konfigüre Edin

Proje kök dizininde `.env` dosyasını oluşturun ve aşağıdaki gibi yapılandırın:

```bash
APP_PORT=5000

JWT_SECRET_KEY=secretkey

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

VERIFICATION_TIME_LIMIT=60000

DATABASE_URL="databaseurl"
```

### 4. Prisma'yı migrate edin

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Sunucuyu başlatın

```bash
npm run dev
```

# API Kullanımı

### POST `/api/auth/register`

### Örnek İstek

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
    "fullname": "Test User",
    "username": "testuser",
    "email": "test_user@test.com",
    "password": "123456"
}
```

### Başarılı Yanıt

```json
{
    "success": true,
    "data": {
        "email": "test_user@test.com",
        "username": "test_user",
        "fullname": "Test User",
        "createdAt": "2025-03-22T11:13:31.249Z",
        "updatedAt": "2025-03-22T11:13:31.249Z"
    }
}
```

### POST `/api/auth/login`

### Örnek İstek

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
    "email": "test_user@test.com",
    "password": "123456"
}
```

### Başarılı Yanıt

```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTgyY2QxLWRhYTktNDYzMi1iZDViLTAzY2E2Y2IxYjQ4ZCIsImVtYWlsIjoia2t1YmlsYXkyNEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6Imt1YmlsYXk0IiwiZnVsbG5hbWUiOiJrdWJpbGF5IGtheWEiLCJpYXQiOjE3NDI2NDI4NDgsImV4cCI6MTc0MjY0NjQ0OH0.LHRVtRYalwL29TE8S181qzk5MQudMytUTA53Orq1lIw"
}
```

### POST `/api/auth/forgot-password`

### Örnek İstek

```bash
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
    "email": "test_user@test.com",
}
```

### Başarılı Yanıt

```json
{
    "success": true,
    "message": "Password reset code sent successfully!"
}
```

### POST `/api/auth/change-password`

### Örnek İstek

```bash
POST http://localhost:5000/api/auth/change-password
Content-Type: application/json

{
    "email":"test_user@test.com",
    "code":"111111",
    "password":"123123",
    "rePassword":"123123"
}
```

### Başarılı Yanıt

```json
{
    "success": true,
    "message": "Password updated successfully!"
}
```

### POST `/api/auth/email-verify`

### Örnek İstek

```bash
POST http://localhost:5000/api/auth/email-verify
Content-Type: application/json

{
    "id":"uuid",
    "emailVerificationCode":"111111"
}
```

### Başarılı Yanıt

```json
{
    "success": true,
    "user": {
        "email": "test_user@test.com",
        "username": "test_user",
        "fullname": "Test User",
        "isEmailVerified": true,
        "createdAt": "2025-03-21T15:03:32.246Z",
        "updatedAt": "2025-03-22T11:17:58.769Z"
    }
}
```

### POST `/api/auth/resend-email`

E-posta doğrulama işlemi.

### Örnek İstek

```bash
POST http://localhost:5000/api/auth/resend-email
Content-Type: application/json

{
    "email": "test_user@test.com",
}
```

### Başarılı Yanıt

```json
{
    "success": true,
    "message": "Verification code be sent!"
}
```

### GET `/api/auth/me`

Giriş yapmış kullanıcının bilgilerini döner.

### Örnek İstek

```bash
GET http://localhost:5000/api/auth/me
Content-Type: application/json
Authorization token
```

### Başarılı Yanıt

```json
{
    "success": true,
    "user": {
        "id": "67582cd1-daa9-4632-bd5b-03ca6cb1b48d",
        "email": "test_user@test.com",
        "username": "test_user",
        "fullname": "Test user",
        "isEmailVerified": true,
        "emailVerificationCode": null,
        "emailVerificationCreatedAt": null,
        "passwordResetCode": null,
        "passwordResetExpires": null,
        "wrongLoginAttempts": 0,
        "isBlocked": false,
        "createdAt": "2025-03-21T15:03:32.246Z",
        "updatedAt": "2025-03-23T11:14:48.416Z"
    }
}
```

### PUT `/api/auth/profile`

Giriş yapmış kullanıcının bilgilerini günceller.

### Örnek İstek

```bash
PUT http://localhost:5000/api/auth/profile
Content-Type: application/json
Authorization token

{
    "fullname":"test"
}
```

### Başarılı Yanıt

```json
{
    "success": true,
    "user": {
        "email": "test_user@test.com",
        "username": "test_user",
        "fullname": "test",
        "createdAt": "2025-03-21T15:03:32.246Z",
        "updatedAt": "2025-03-23T11:29:12.576Z"
    }
}
```