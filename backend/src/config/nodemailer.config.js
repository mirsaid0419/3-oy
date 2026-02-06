import nodemailer from 'nodemailer';
import config from './config.js';

/**
 * Nodemailer Transport yaratish
 * Gmail, Outlook, Yahoo va boshqa email provayderlar bilan ishlaydi
 */
const createTransporter = () => {
    // Gmail uchun konfiguratsiya
    if (config.EMAIL.SERVICE === 'gmail') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAIL.USER,
                pass: config.EMAIL.PASS, // Gmail App Password kerak
            },
        });
    }

    // Outlook/Hotmail uchun konfiguratsiya
    if (config.EMAIL.SERVICE === 'outlook') {
        return nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false, // TLS
            auth: {
                user: config.EMAIL.USER,
                pass: config.EMAIL.PASS,
            },
        });
    }

    // Yahoo uchun konfiguratsiya
    if (config.EMAIL.SERVICE === 'yahoo') {
        return nodemailer.createTransport({
            service: 'yahoo',
            auth: {
                user: config.EMAIL.USER,
                pass: config.EMAIL.PASS,
            },
        });
    }

    // Custom SMTP server uchun konfiguratsiya
    return nodemailer.createTransport({
        host: config.EMAIL.HOST || 'smtp.gmail.com',
        port: config.EMAIL.PORT || 587,
        secure: config.EMAIL.SECURE || false, // true for 465, false for other ports
        auth: {
            user: config.EMAIL.USER,
            pass: config.EMAIL.PASS,
        },
    });
};

// Transporter yaratish
let transporter;
try {
    transporter = createTransporter();
    console.log('✅ Nodemailer transporter yaratildi');
} catch (error) {
    console.error('❌ Nodemailer transporter yaratishda xatolik:', error.message);
}

/**
 * Email yuborish funksiyasi
 * @param {Object} options - Email parametrlari
 * @param {string} options.to - Qabul qiluvchi email
 * @param {string} options.subject - Email mavzusi
 * @param {string} options.html - HTML content
 * @param {string} options.text - Text content (optional)
 * @returns {Promise<Object>} - Yuborilgan email haqida ma'lumot
 */
export const sendEmail = async ({ to, subject, html, text }) => {
    try {
        if (!transporter) {
            throw new Error('Email transporter konfiguratsiya qilinmagan');
        }

        const mailOptions = {
            from: `"${config.EMAIL.FROM_NAME || 'YouTube Clone'}" <${config.EMAIL.USER}>`,
            to,
            subject,
            html,
            text: text || '', // Fallback text version
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('✅ Email yuborildi:', {
            messageId: info.messageId,
            to: to,
            subject: subject,
        });

        return {
            success: true,
            messageId: info.messageId,
            response: info.response,
        };
    } catch (error) {
        console.error('❌ Email yuborishda xatolik:', error);
        throw error;
    }
};

/**
 * Transporterni tekshirish
 */
export const verifyTransporter = async () => {
    try {
        if (!transporter) {
            return { success: false, message: 'Transporter yaratilmagan' };
        }

        await transporter.verify();
        console.log('✅ Email server tayyor');
        return { success: true, message: 'Email server tayyor' };
    } catch (error) {
        console.error('❌ Email server xatosi:', error.message);
        return { success: false, message: error.message };
    }
};

export default transporter;
