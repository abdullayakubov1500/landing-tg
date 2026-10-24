function telegramChatIds() {
  return [...new Set(
    [process.env.TELEGRAM_CHAT_ID, process.env.TELEGRAM_GROUP_ID]
      .map((value) => String(value || "").trim())
      .filter(Boolean),
  )];
}

async function sendMessage(token, chatId, text) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  const payload = await response.json().catch(() => ({}));
  return Boolean(payload.ok);
}

export async function sendLeadToTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = telegramChatIds();
  if (!token || chatIds.length === 0) {
    return { ok: false, skipped: true };
  }

  const quizLines = lead.quiz
    ? Object.entries(lead.quiz)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    : "";

  const text = [
    "Новая заявка — Оксид",
    `Источник: ${lead.source === "quiz" ? "ИИ-квиз" : "форма сайта"}`,
    `Имя: ${lead.name || "—"}`,
    `Контакт: ${lead.contact || "—"}`,
    `Тип проекта: ${lead.projectType || "—"}`,
    lead.comment ? `Комментарий: ${lead.comment}` : "",
    quizLines ? `Квиз:\n${quizLines}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const results = await Promise.all(chatIds.map((chatId) => sendMessage(token, chatId, text)));
  return { ok: results.some(Boolean), skipped: false };
}
