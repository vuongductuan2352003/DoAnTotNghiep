import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Các bản dịch (Tiếng Anh và Tiếng Việt)
const resources = {
  en: {
    translation: {
      "home": "Home",
      "about": "About",
      "services": "Services",
      "contact": "Contact",
      "login": "Login",
      "register": "Register",
      "policies": "Policies"
    }
  },
  vi: {
    translation: {
      "home": "Trang chủ",
      "about": "Giới thiệu",
      "services": "Dịch vụ",
      "contact": "Liên hệ",
      "login": "Đăng nhập",
      "register": "Đăng ký",
      "policies": "Chính sách"
    }
  }
};

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ của trình duyệt
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false // React đã tự động bảo vệ khỏi XSS
    }
  });

export default i18n;
