import { createLead, markTelegramSent } from "@/lib/leads";
import { sendLeadToTelegram } from "@/lib/telegram";

function isValidLead(body) {
  const name = String(body?.name || "").trim();
  const contact = String(body?.contact || "").trim();
  return name.length >= 2 && contact.length >= 3;
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!isValidLead(body)) {
    return Response.json(
      { ok: false, error: "Укажите имя и контакт — телефон или Telegram." },
      { status: 400 },
    );
  }

  const lead = await createLead(body);
  const telegram = await sendLeadToTelegram(lead);
  if (telegram.ok) {
    await markTelegramSent(lead.id, true);
  }

  return Response.json({
    ok: true,
    id: lead.id,
    telegram: telegram.skipped ? "skipped" : telegram.ok ? "sent" : "failed",
  });
}
