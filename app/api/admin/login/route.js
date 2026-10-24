import { cookies } from "next/headers";
import { checkAdminPassword, getAdminCookieName, signAdminSession } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const password = String(body?.password || "");
  if (!checkAdminPassword(password)) {
    return Response.json({ ok: false, error: "Неверный пароль." }, { status: 401 });
  }

  const store = await cookies();
  store.set(getAdminCookieName(), signAdminSession(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ ok: true });
}
