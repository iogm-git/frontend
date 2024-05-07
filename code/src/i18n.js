// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from './locales/en/translation.json';
import translationID from './locales/id/translation.json';

// Configure i18n instance
i18n
    .use(initReactI18next) // Initialize i18next
    .init({
        resources: {
            en: {
                translation: translationEN, // English translations
            },
            id: {
                translation: translationID, // Indonesian translations
            },
        },
        lng: 'en', // Default language
        fallbackLng: 'en', // Fallback language in case the translation is missing
        interpolation: {
            escapeValue: false, // React already escapes content by default
        },
    });

export default i18n;
