# 📧 OTP Email Xizmati - Resend Integratsiyasi

## 🔧 O'rnatish

### 1. Resend API Key Olish

1. [Resend.com](https://resend.com) ga kiring
2. Sign up / Login qiling
3. Dashboard → API Keys → Create API Key
4. API key ni nusxalang (masalan: `re_123abc...`)

### 2. Environment Variables Sozlash

`.env` faylingizga quyidagini qo'shing:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

**Render.com da:**
1. Dashboard → Environment → Add Environment Variable
2. Key: `RESEND_API_KEY`
3. Value: `re_your_actual_api_key_here`

### 3. Email Domain Sozlash (Production uchun)

**Development:**
- Default: `onboarding@resend.dev` (test email)
- Hech qanday sozlash kerak emas

**Production:**
1. Resend Dashboard → Domains → Add Domain
2. O'z domeningizni qo'shing (masalan: `yourdomain.com`)
3. DNS records ni sozlang
4. `user.service.js` da `from` ni o'zgartiring:
   ```javascript
   from: 'YouTube <noreply@yourdomain.com>'
   ```

## 🚀 Ishlatish

### OTP Yuborish

```bash
POST /api/users/otp
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Javob (Success):**
```json
{
  "status": 200,
  "message": "OTP kod emailingizga yuborildi"
}
```

**Javob (Rate Limited):**
```json
{
  "status": 429,
  "message": "OTP allaqachon yuborilgan. 4 daqiqadan keyin qayta urinib ko'ring."
}
```

### Registratsiya (OTP bilan)

```bash
POST /api/users/register
Content-Type: multipart/form-data

{
  "user_name": "john_doe",
  "email": "user@example.com",
  "password": "password123",
  "otp": "123456"
}
```

## 🎨 Email Template

Email quyidagi elementlarni o'z ichiga oladi:
- ✅ Professional dizayn
- ✅ Responsive layout
- ✅ 6 raqamli OTP kod
- ✅ 5 daqiqa amal qilish muddati
- ✅ Xavfsizlik ogohlantirishi
- ✅ Branding (YouTube logo)

## 🔒 Xavfsizlik Xususiyatlari

1. **Rate Limiting**: Bir email uchun 5 daqiqada faqat 1 marta OTP
2. **Expiration**: OTP 5 daqiqadan keyin avtomatik eskiradi
3. **Cleanup**: Eskirgan OTP lar avtomatik tozalanadi
4. **Validation**: Email format va OTP format tekshiruvi

## 🐛 Troubleshooting

### Xato: "Email service not configured"
**Yechim:** `.env` faylida `RESEND_API_KEY` ni tekshiring

### Xato: "Connection timeout" (Render)
**Yechim:** ✅ Hal qilindi! Resend SMTP o'rniga HTTP API ishlatadi

### Email kelmayapti
**Tekshirish:**
1. Resend Dashboard → Logs → Email yuborilganmi?
2. Spam papkani tekshiring
3. Email to'g'ri yozilganmi?

## 📊 Render Logs

```bash
# Render da loglarni ko'rish
Email yuborildi: { id: 'abc123...' }
```

## 🔄 Eski Nodemailer dan Farqi

| Xususiyat | Nodemailer (Gmail) | Resend |
|-----------|-------------------|--------|
| Render Support | ❌ Timeout | ✅ Ishlaydi |
| Sozlash | Murakkab | Oson |
| Reliability | Past | Yuqori |
| Email Template | Oddiy | Professional |
| Rate Limiting | Yo'q | ✅ Bor |

## 📝 Qo'shimcha Ma'lumot

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Email Best Practices](https://resend.com/docs/send-with-nodejs)
