import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";

function secret() {
  return process.env.ADMIN_PASSWORD || "";
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function signAdminSession() {
  const key = secret();
  if (!key) return "";
  return createHmac("sha256", key).update("oxide-admin").digest("hex");
}

export function isAdminCookie(value) {
  const expected = signAdminSession();
  if (!value || !expected || value.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function checkAdminPassword(password) {
  const expected = secret();
  if (!password || !expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
