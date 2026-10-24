import { askGemini } from "@/lib/gemini";
import { createLead, markTelegramSent } from "@/lib/leads";
import { sendLeadToTelegram } from "@/lib/telegram";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const safeMessages = messages
    .filter((item) => item && (item.role === "user" || item.role === "assistant"))
    .map((item) => ({
      role: item.role,
      content: String(item.content || "").slice(0, 2000),
    }))
    .slice(-16);

  const result = await askGemini(safeMessages);
  if (!result.ok) {
    return Response.json({
      ok: false,
      fallback: true,
      reason: result.reason,
    });
  }

  let submitted = false;
  if (result.shouldSubmit && result.collected?.contact && result.collected?.name) {
    const lead = await createLead({
      name: result.collected.name,
      contact: result.collected.contact,
      projectType: result.collected.type || "",
      comment: [
        result.collected.goal && `Цель: ${result.collected.goal}`,
        result.collected.deadline && `Срок: ${result.collected.deadline}`,
        result.collected.budget && `Бюджет: ${result.collected.budget}`,
      ]
        .filter(Boolean)
        .join(". "),
      source: "quiz",
      quiz: result.collected,
    });
    const telegram = await sendLeadToTelegram(lead);
    if (telegram.ok) await markTelegramSent(lead.id, true);
    submitted = true;
  }

  return Response.json({
    ok: true,
    message: result.message,
    collected: result.collected,
    submitted,
  });
}
