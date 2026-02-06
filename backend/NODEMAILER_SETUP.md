# 📧 Nodemailer bilan OTP Email Yuborish - To'liq Qo'llanma

## 🎯 Umumiy Ma'lumot

Ushbu loyihada **Nodemailer** yordamida OTP (One-Time Password) email yuborish tizimi to'liq sozlangan. Resend'dan farqli o'laroq, Nodemailer **domain talab qilmaydi** va istalgan email provayderda ishlaydi.

---

## 🚀 Tezkor Boshlash

### 1. Gmail App Password Olish

Gmail ishlatayotgan bo'lsangiz, oddiy parol ishlamaydi. **App Password** olishingiz kerak:

#### Qadamlar:
1. Google hisobingizga kiring: https://myaccount.google.com
2. **Security** bo'limiga o'ting
3. **2-Step Verification** ni yoqing (agar yoqilmagan bo'lsa)
4. **App passwords** ga o'ting: https://myaccount.google.com/apppasswords
5. **Select app** → **Other (Custom name)** → "YouTube Clone" deb yozing
6. **Generate** tugmasini bosing
7. 16 ta belgili parolni nusxalang (masalan: `abcd efgh ijkl mnop`)

#### ⚠️ Muhim:
- App password faqat **bir marta** ko'rsatiladi, uni saqlang!
- Oddiy parolingiz emas, app password ishlatiladi
- 2-Step Verification yoqilgan bo'lishi shart

---

### 2. .env Faylini Sozlash

`.env` faylingizga quyidagilarni qo'shing:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=sizning_emailingiz@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
EMAIL_FROM_NAME=YouTube Clone

# Development rejim (OTP ni response da ko'rish uchun)
NODE_ENV=development
```

---

## 📋 Qo'llab-quvvatlanadigan Email Provayderlar

### 1. **Gmail** (Tavsiya etiladi)
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 2. **Outlook / Hotmail**
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

### 3. **Yahoo**
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_password
```

### 4. **Custom SMTP Server**
```env
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
```

---

## 🧪 Testlash

### 1. Serverni Ishga Tushirish
```bash
npm run dev
```

### 2. OTP So'rash (Postman / Thunder Client)

**Endpoint:** `POST http://localhost:3000/api/users/otp`

**Request Body:**
```json
{
  "email": "test@gmail.com"
}
```

**Muvaffaqiyatli Response (Development):**
```json
{
  "status": 200,
  "message": "Tasdiqlash kodi test@gmail.com manziliga yuborildi",
  "success": true,
  "dev_otp": 123456,
  "dev_expires_in": "5 daqiqa"
}
```

**Muvaffaqiyatli Response (Production):**
```json
{
  "status": 200,
  "message": "Tasdiqlash kodi test@gmail.com manziliga yuborildi",
  "success": true
}
```

### 3. Ro'yxatdan O'tish (OTP bilan)

**Endpoint:** `POST http://localhost:3000/api/users/register`

**Request Body:**
```json
{
  "user_name": "john_doe",
  "email": "test@gmail.com",
  "password": "StrongPass123!",
  "otp": "123456"
}
```

---

## 🎨 Email Template Xususiyatlari

### Chiroyli Dizayn
- ✅ Gradient background
- ✅ Responsive (mobil va desktop)
- ✅ Professional ko'rinish
- ✅ Emoji va ikonlar
- ✅ Xavfsizlik ogohlantirishi
- ✅ Foydali maslahatlar

### Email Tarkibi
1. **Header** - YouTube logo va sarlavha
2. **OTP Code** - Katta, aniq ko'rinadigan kod
3. **Expiry Info** - Amal qilish muddati (5 daqiqa)
4. **Security Warning** - Xavfsizlik ogohlantirishi
5. **Tips** - Foydali maslahatlar
6. **Footer** - Copyright va havolalar

---

## 🔧 Xatoliklarni Bartaraf Qilish

### ❌ "Invalid login: 535-5.7.8 Username and Password not accepted"

**Sabab:** Oddiy parol ishlatilgan yoki 2-Step Verification yoqilmagan.

**Yechim:**
1. Gmail App Password oling (yuqoridagi qo'llanmaga qarang)
2. `.env` faylida `EMAIL_PASS` ni App Password bilan almashtiring

---

### ❌ "Email transporter konfiguratsiya qilinmagan"

**Sabab:** `.env` faylida email sozlamalari yo'q.

**Yechim:**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

### ❌ Email yuborilmadi, lekin OTP yaratildi

**Sabab:** Email konfiguratsiyasi noto'g'ri yoki internet aloqasi yo'q.

**Yechim (Development):**
- Console da OTP ko'rsatiladi, uni qo'lda kiriting
- Email sozlamalarini tekshiring
- Internet aloqasini tekshiring

**Yechim (Production):**
- Email konfiguratsiyasini to'g'rilang
- SMTP server ishlayotganini tekshiring

---

### ❌ "OTP allaqachon yuborilgan. X daqiqadan keyin qayta urinib ko'ring"

**Sabab:** Spam himoyasi - bir email uchun 5 daqiqada faqat bitta OTP.

**Yechim:**
- Kutib turing yoki
- `src/logs/otp.json` faylini tozalang (faqat development da!)

---

## 📊 Xavfsizlik Xususiyatlari

### ✅ Spam Himoyasi
- Bir email uchun 5 daqiqada faqat 1 ta OTP
- Eskirgan OTP lar avtomatik tozalanadi

### ✅ OTP Xavfsizligi
- 6 raqamli tasodifiy kod
- 5 daqiqa amal qiladi
- Bir martalik ishlatiladi

### ✅ Email Validatsiya
- Email format tekshiriladi
- Bo'sh email qabul qilinmaydi

### ✅ Production Xavfsizligi
- Production da OTP response da ko'rsatilmaydi
- Faqat development da debug ma'lumotlari

---

## 🌍 Production uchun Tavsiyalar

### 1. Environment Variables
```env
NODE_ENV=production
EMAIL_SERVICE=gmail
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=secure_app_password
EMAIL_FROM_NAME=Your Company Name
```

### 2. SMTP Server
- **Gmail:** Kuniga 500 ta email limiti
- **SendGrid:** Professional SMTP service (tavsiya etiladi)
- **AWS SES:** Amazon Simple Email Service
- **Mailgun:** Kuchli email API

### 3. Monitoring
- Email yuborilish statistikasini kuzating
- Xatoliklarni log qiling
- Rate limiting qo'shing

---

## 📚 Qo'shimcha Resurslar

### Nodemailer
- Rasmiy dokumentatsiya: https://nodemailer.com
- Gmail sozlamalari: https://nodemailer.com/usage/using-gmail/

### Gmail App Passwords
- Yaratish: https://myaccount.google.com/apppasswords
- Qo'llanma: https://support.google.com/accounts/answer/185833

### Email Template
- HTML Email dizayn: https://www.campaignmonitor.com/css/
- Email testing: https://www.mail-tester.com/

---

## 🎉 Tayyor!

Endi sizda to'liq ishlaydigan, professional OTP email tizimi bor:

✅ Nodemailer bilan email yuborish  
✅ Chiroyli HTML template  
✅ Spam himoyasi  
✅ Xatoliklarni boshqarish  
✅ Development va Production rejimlar  
✅ Gmail, Outlook, Yahoo qo'llab-quvvatlash  

**Savollar bo'lsa, menga murojaat qiling! 🚀**
