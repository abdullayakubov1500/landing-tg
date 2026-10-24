import { cookies } from "next/headers";
import { getAdminCookieName } from "@/lib/auth";

export async function POST() {
  const store = await cookies();
  store.delete(getAdminCookieName());
  return Response.json({ ok: true });
}
