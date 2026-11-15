# Keepsake: landing page

Лендінг цифрової агенції, зібраний на Vite + Pug + SCSS.

**Демо:** https://OleksandrDaneliuk.github.io/landing-keepsake-vite/

## Вимоги до середовища

- Node.js 20+ (LTS) і npm
- Git

## Команди

```bash
npm install        # встановити залежності (і хуки husky)
npm run dev        # dev-сервер з hot reload
npm run build      # продакшн-збірка у dist/
npm run preview    # локальний перегляд збірки
npm run format     # Prettier --write
npm run lint       # Stylelint + Prettier --check
npm run images     # AVIF/WebP/JPEG з images-src/ у src/assets/images/
```

## Структура проєкту

```
landing-keepsake-vite/
├── .github/workflows/deploy.yml   # публікація на GitHub Pages
├── .husky/                        # pre-commit (lint-staged)
├── images-src/                    # оригінали зображень
├── scripts/images.mjs             # конвертація зображень (sharp)
├── src/
│   ├── assets/images/             # AVIF, WebP, JPEG у двох ширинах
│   ├── components/                # header, footer, sections/*
│   ├── data/                      # масиви об'єктів для кожної секції
│   ├── includes/                  # SVG-спрайт
│   ├── layouts/main.pug           # базовий макет
│   ├── mixins/                    # +btn, +icon, +picture, +work-card, ...
│   ├── pages/index.pug            # сторінка
│   └── styles/                    # SCSS (abstracts, base, layout, components)
├── .browserslistrc
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Архітектура

**Pug.** `pages/index.pug` успадковує `layouts/main.pug` (`extends`, `block`, `append`, `prepend`).
Кожна секція, шапка й футер лежать в окремих файлах і підключаються через `include`.
Повторювані блоки (навігація, роботи, послуги, статистика, журнал) беруться з масивів у
`src/data/` і виводяться через `each`. Спільна розмітка (кнопки, іконки, адаптивні
зображення, картки) винесена в міксини в `src/mixins/`.

**SCSS.** Лише `@use` і `@forward`, у кожній папці є `_index.scss`, єдина точка входу
`main.scss`. Дизайн-токени живуть у `abstracts/` як map-и й перетворюються на CSS custom
properties у `:root`. Мобільний підхід (mobile first) реалізує міксин `mq()`. Кожен БЕМ-блок
лежить в окремому файлі `components/_<block>.scss`.

## Інструменти

| Інструмент                       | Навіщо                                            |
| -------------------------------- | ------------------------------------------------- |
| Vite                             | dev-сервер і збірка                               |
| vituum + @vituum/vite-plugin-pug | компіляція Pug у HTML                             |
| sass                             | компіляція SCSS                                   |
| PostCSS + Autoprefixer           | вендорні префікси за Browserslist                 |
| sharp                            | генерація AVIF/WebP/JPEG                          |
| Prettier + @prettier/plugin-pug  | форматування коду, зокрема `.pug`                 |
| Stylelint                        | лінтинг SCSS (БЕМ, вкладеність, без `!important`) |
| husky + lint-staged              | перевірка перед комітом                           |
| GitHub Actions                   | автоматична публікація на Pages                   |

## Цільові браузери

```
last 2 Chrome versions
last 2 Firefox versions
last 2 Edge versions
last 2 Safari versions
last 2 iOS versions
```

## Оптимізація

| Що                  | До                        | Після                           |
| ------------------- | ------------------------- | ------------------------------- |
| CSS (мінімізований) | {25,7} КБ (`style.css`)   | {22.7} КБ (`dist/assets/*.css`) |
| CSS (gzip)          | {4,5} КБ                  | {3.9} КБ                        |
| Зображення (всі)    | {6.7} MБ (оригінали JPEG) | {0.5} MБ (AVIF)                 |
