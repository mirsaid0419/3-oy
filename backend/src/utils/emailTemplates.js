/**
 * OTP Email HTML Template
 * Chiroyli va professional ko'rinishga ega email template
 */
export const otpEmailTemplate = (otp, expiryMinutes = 5) => {
    return `
    <!DOCTYPE html>
    <html lang="uz">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Tasdiqlash Kodi</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            line-height: 1.6;
          }
          
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }
          
          .header {
            background: linear-gradient(135deg, #FF0000 0%, #CC0000 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          
          .header p {
            font-size: 14px;
            opacity: 0.95;
          }
          
          .logo {
            font-size: 48px;
            margin-bottom: 10px;
          }
          
          .content {
            padding: 40px 30px;
            background: #ffffff;
          }
          
          .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
            font-weight: 500;
          }
          
          .message {
            color: #666;
            font-size: 15px;
            margin-bottom: 30px;
            line-height: 1.8;
          }
          
          .otp-container {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            border: 2px dashed #667eea;
          }
          
          .otp-label {
            font-size: 13px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            font-weight: 600;
          }
          
          .otp-code {
            font-size: 42px;
            font-weight: 800;
            color: #FF0000;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            margin: 10px 0;
          }
          
          .expiry-info {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px 20px;
            border-radius: 8px;
            margin: 25px 0;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          
          .expiry-info .icon {
            font-size: 24px;
          }
          
          .expiry-info .text {
            color: #856404;
            font-size: 14px;
            flex: 1;
          }
          
          .expiry-info strong {
            color: #664d03;
          }
          
          .security-warning {
            background: #f8d7da;
            border-left: 4px solid #dc3545;
            padding: 15px 20px;
            border-radius: 8px;
            margin: 25px 0;
          }
          
          .security-warning .title {
            color: #721c24;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .security-warning .text {
            color: #721c24;
            font-size: 13px;
            line-height: 1.6;
          }
          
          .tips {
            background: #d1ecf1;
            border-left: 4px solid #17a2b8;
            padding: 15px 20px;
            border-radius: 8px;
            margin: 25px 0;
          }
          
          .tips .title {
            color: #0c5460;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 10px;
          }
          
          .tips ul {
            margin-left: 20px;
            color: #0c5460;
            font-size: 13px;
          }
          
          .tips li {
            margin-bottom: 5px;
          }
          
          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
          }
          
          .footer-text {
            color: #6c757d;
            font-size: 13px;
            margin-bottom: 10px;
          }
          
          .footer-links {
            margin-top: 15px;
          }
          
          .footer-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 10px;
            font-size: 12px;
          }
          
          .footer-links a:hover {
            text-decoration: underline;
          }
          
          .social-icons {
            margin-top: 20px;
          }
          
          .social-icons a {
            display: inline-block;
            margin: 0 8px;
            font-size: 24px;
            text-decoration: none;
          }
          
          @media only screen and (max-width: 600px) {
            body {
              padding: 20px 10px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .header h1 {
              font-size: 24px;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .otp-code {
              font-size: 36px;
              letter-spacing: 5px;
            }
            
            .footer {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <!-- Header -->
          <div class="header">
            <div class="logo">🎬</div>
            <h1>YouTube Clone</h1>
            <p>Hisobingizni tasdiqlang</p>
          </div>
          
          <!-- Content -->
          <div class="content">
            <div class="greeting">Assalomu alaykum! 👋</div>
            
            <div class="message">
              Hisobingizni tasdiqlash uchun quyidagi bir martalik parolni (OTP) kiriting. 
              Bu kod faqat sizning xavfsizligingiz uchun yaratilgan.
            </div>
            
            <!-- OTP Code -->
            <div class="otp-container">
              <div class="otp-label">Tasdiqlash Kodi</div>
              <div class="otp-code">${otp}</div>
            </div>
            
            <!-- Expiry Info -->
            <div class="expiry-info">
              <div class="icon">⏰</div>
              <div class="text">
                Bu kod <strong>${expiryMinutes} daqiqa</strong> davomida amal qiladi. 
                Iltimos, tezroq kiriting!
              </div>
            </div>
            
            <!-- Security Warning -->
            <div class="security-warning">
              <div class="title">
                <span>⚠️</span>
                <span>Xavfsizlik Ogohlantirishi</span>
              </div>
              <div class="text">
                Agar siz bu kodni so'ramagan bo'lsangiz, bu xabarni e'tiborsiz qoldiring 
                va parolingizni darhol o'zgartiring. Hech qachon OTP kodingizni boshqalar bilan baham ko'rmang!
              </div>
            </div>
            
            <!-- Tips -->
            <div class="tips">
              <div class="title">💡 Foydali Maslahatlar:</div>
              <ul>
                <li>OTP kodini hech kimga bermang</li>
                <li>Faqat rasmiy saytda kiriting</li>
                <li>Shubhali havolalarga kirmang</li>
                <li>Parolingizni muntazam yangilang</li>
              </ul>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="footer-text">
              © ${new Date().getFullYear()} YouTube Clone. Barcha huquqlar himoyalangan.
            </div>
            <div class="footer-text">
              Bu avtomatik xabar. Iltimos, javob bermang.
            </div>
            <div class="footer-links">
              <a href="#">Yordam Markazi</a> •
              <a href="#">Maxfiylik Siyosati</a> •
              <a href="#">Foydalanish Shartlari</a>
            </div>
            <div class="social-icons">
              <a href="#" title="YouTube">▶️</a>
              <a href="#" title="Twitter">🐦</a>
              <a href="#" title="Facebook">📘</a>
              <a href="#" title="Instagram">📷</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

/**
 * Welcome Email Template
 */
export const welcomeEmailTemplate = (userName) => {
    return `
    <!DOCTYPE html>
    <html lang="uz">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xush kelibsiz!</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
          <h1 style="color: #FF0000; text-align: center;">🎉 Xush kelibsiz, ${userName}!</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            YouTube Clone platformasiga muvaffaqiyatli ro'yxatdan o'tdingiz! 
            Endi siz videolarni yuklash, ko'rish va ulashishingiz mumkin.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: #FF0000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Platformani O'rganish
            </a>
          </div>
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
            © ${new Date().getFullYear()} YouTube Clone
          </p>
        </div>
      </body>
    </html>
  `;
};

/**
 * Password Reset Email Template
 */
export const passwordResetTemplate = (resetLink, expiryMinutes = 15) => {
    return `
    <!DOCTYPE html>
    <html lang="uz">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Parolni Tiklash</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
          <h1 style="color: #FF0000; text-align: center;">🔒 Parolni Tiklash</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Parolingizni tiklash uchun so'rov yuborildi. Quyidagi tugmani bosing:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background: #FF0000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Parolni Tiklash
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            Bu havola <strong>${expiryMinutes} daqiqa</strong> davomida amal qiladi.
          </p>
          <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px;">
            <strong style="color: #856404;">⚠️ Diqqat:</strong>
            <p style="color: #856404; font-size: 13px; margin: 5px 0 0 0;">
              Agar siz bu so'rovni yubormaganingiz bo'lsa, bu xabarni e'tiborsiz qoldiring.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};
