# TravelTrucks — Frontend (React + Vite)

- Фронтенд веб-додатку для сервісу оренди кемперів. Стек: React (Vite), Redux (Toolkit), React Router, Axios, CSS-модулі.

Швидкий старт
1. Встановити залежності:

npm install

2. Запустити dev сервер:

npm run dev

3. Лінтер:

npm run lint


4. Збіірка для продакшен:

npm run build


Структура
- `src/pages` — сторінки (`Home`, `CatalogPage`, `CamperDetailsPage`, `FavoritesPage`, `ReviewsPage`)
- `src/components` — повторно використовувані компоненти (карта кемпера, форма бронювання, модалки, лоадер)
- `src/store` / `src/store/slices` — Redux store і слайси (campers)
- `src/services` — місце для API-обгорток (файл `src/services/api.js` зараз пустий)
- `src/utils` — утиліти (наприклад, `formatPrice.js`)

Реалізовано
- Vite + React + Redux + React Router + Axios 
- Каталог з фільтрами та кнопкою "Load more"  (див. `src/pages/CatalogPage.jsx`)
- Сторінка детального опису кемпера: галерея, відгуки, форма бронювання (`src/pages/CamperDetailsPage.jsx`, `src/components/BookingForm.jsx`)
- Збереження обраного в `localStorage` — реалізовано в слайсі (`src/store/slices/campersSlice.js`)
- Формат ціни — `src/utils/formatPrice.js`
- Loader при асинхронних запитах  (компонент `Loader`), slice має `status`

# 
