import { GEMINI_SYSTEM_PROMPT } from "./quiz";

const MODEL = "gemini-3.5-flash-lite";

function extractJson(text) {
  if (!text) return null;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    try {
      return JSON.parse(trimmed.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

export async function askGemini(messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { ok: false, reason: "no_key" };
  }

  const contents = messages.map((item) => ({
    role: item.role === "assistant" ? "model" : "user",
    parts: [{ text: item.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: GEMINI_SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          temperature: 0.6,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    return { ok: false, reason: "api_error", details: errorText.slice(0, 400) };
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("\n");
  const parsed = extractJson(text);

  if (!parsed?.message) {
    return {
      ok: true,
      message: text || "Давайте продолжим бриф — какой сайт вам нужен?",
      collected: {},
      shouldSubmit: false,
    };
  }

  return {
    ok: true,
    message: parsed.message,
    collected: parsed.collected || {},
    shouldSubmit: Boolean(parsed.shouldSubmit),
  };
}
