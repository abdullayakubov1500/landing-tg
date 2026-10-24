# Оксид — лендинг веб-ателье

Продающая страница с ИИ-квизом, формой заявок, админкой `/admin` и дублем лидов в Telegram.

## Запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Сайт: http://localhost:3000  
Админка: http://localhost:3000/admin (пароль из `ADMIN_PASSWORD`, в примере — `admin`)

## Переменные `.env.local`

- `GEMINI_API_KEY` — ключ Google AI, модель `gemini-3.5-flash-lite`
- `TELEGRAM_BOT_TOKEN` — токен бота от [@BotFather](https://t.me/BotFather)
- `TELEGRAM_CHAT_ID` — личка: ваш user id (напишите боту `/start`)
- `TELEGRAM_GROUP_ID` — id группы (добавьте бота в группу и напишите там сообщение)
- `ADMIN_PASSWORD` — пароль входа в `/admin`

Без ключей Gemini и Telegram сайт и админка работают: квиз переключается на локальные шаги, заявки сохраняются в `data/leads.json`.
