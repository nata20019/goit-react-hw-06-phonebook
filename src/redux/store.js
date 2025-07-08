import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Це localStorage за замовчуванням
import { contactsReducer } from './contactsSlice';

// Конфігурація для Redux Persist
const persistConfig = {
  key: 'root', // Ключ для збереження в сховищі
  storage, // Використовуємо localStorage
  whitelist: ['contacts'], // Зберігаємо тільки частину 'contacts' (що містить масив контактів)
  // blacklist: ['filter'], // Фільтр не зберігаємо, він буде скидатися при оновленні сторінки
};

// Створюємо персистований редюсер
const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

// Конфігуруємо Redux Store
export const store = configureStore({
  reducer: {
    contactsBook: persistedContactsReducer, // Використовуємо наш персистований редюсер
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ігноруємо ці дії від Redux Persist, щоб уникнути попереджень про несеріалізовані значення
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Створюємо persistor для Redux Persist
export const persistor = persistStore(store);
