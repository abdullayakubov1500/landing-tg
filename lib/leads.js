import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "leads.json");

async function ensureFile() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, "[]", "utf8");
  }
}

export async function listLeads() {
  await ensureFile();
  const raw = await readFile(filePath, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveLeads(leads) {
  await ensureFile();
  await writeFile(filePath, JSON.stringify(leads, null, 2), "utf8");
}

export async function createLead(input) {
  const leads = await listLeads();
  const lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: String(input.name || "").trim(),
    contact: String(input.contact || "").trim(),
    projectType: String(input.projectType || "").trim(),
    comment: String(input.comment || "").trim(),
    source: input.source === "quiz" ? "quiz" : "form",
    quiz: input.quiz && typeof input.quiz === "object" ? input.quiz : null,
    status: "new",
    telegramSent: false,
  };
  leads.unshift(lead);
  await saveLeads(leads);
  return lead;
}

export async function updateLeadStatus(id, status) {
  const allowed = ["new", "progress", "done"];
  if (!allowed.includes(status)) return null;
  const leads = await listLeads();
  const index = leads.findIndex((item) => item.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], status };
  await saveLeads(leads);
  return leads[index];
}

export async function markTelegramSent(id, sent) {
  const leads = await listLeads();
  const index = leads.findIndex((item) => item.id === id);
  if (index === -1) return;
  leads[index].telegramSent = sent;
  await saveLeads(leads);
}
