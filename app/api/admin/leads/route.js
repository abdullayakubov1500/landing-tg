import { cookies } from "next/headers";
import { getAdminCookieName, isAdminCookie } from "@/lib/auth";
import { listLeads, updateLeadStatus } from "@/lib/leads";

async function requireAdmin() {
  const store = await cookies();
  return isAdminCookie(store.get(getAdminCookieName())?.value);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const leads = await listLeads();
  return Response.json({ ok: true, leads });
}

export async function PATCH(request) {
  if (!(await requireAdmin())) {
    return Response.json({ ok: false }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const lead = await updateLeadStatus(body?.id, body?.status);
  if (!lead) {
    return Response.json({ ok: false, error: "Заявка не найдена." }, { status: 404 });
  }
  return Response.json({ ok: true, lead });
}
