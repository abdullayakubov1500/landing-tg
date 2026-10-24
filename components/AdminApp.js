"use client";

import { useEffect, useState } from "react";

const statuses = [
  { id: "new", label: "новая" },
  { id: "progress", label: "в работе" },
  { id: "done", label: "закрыта" },
];

export default function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState([]);

  async function loadLeads() {
    const response = await fetch("/api/admin/leads");
    if (!response.ok) {
      setAuthed(false);
      return;
    }
    const payload = await response.json();
    setLeads(payload.leads || []);
    setAuthed(true);
  }

  useEffect(() => {
    loadLeads().finally(() => setChecking(false));
  }, []);

  async function onLogin(event) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error || "Не удалось войти.");
      return;
    }
    setPassword("");
    await loadLeads();
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setLeads([]);
  }

  async function onStatus(id, status) {
    const response = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) {
      const payload = await response.json();
      setLeads((prev) => prev.map((item) => (item.id === id ? payload.lead : item)));
    }
  }

  if (checking) {
    return <p className="p-8 text-muted">Проверяем доступ…</p>;
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md items-center px-5">
        <form onSubmit={onLogin} className="w-full border border-line bg-card p-8">
          <h1 className="font-display text-3xl">Админка Оксид</h1>
          <p className="mt-2 text-sm text-muted">Пароль из файла .env.local</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-6 w-full rounded-md border border-line bg-bg px-3 py-3 outline-none focus:border-accent"
          />
          {error ? <p className="mt-3 text-sm text-accent-deep">{error}</p> : null}
          <button type="submit" className="mt-5 w-full rounded-full bg-accent py-3 text-[#12161a]">
            Войти
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            <a href="/" className="hover:text-fg">
              На сайт
            </a>
          </p>
          <h1 className="font-display text-4xl">Заявки</h1>
        </div>
        <button type="button" onClick={onLogout} className="rounded-full border border-line px-4 py-2">
          Выйти
        </button>
      </div>
      {leads.length === 0 ? (
        <p className="text-muted">Пока пусто. Отправьте форму на главной.</p>
      ) : (
        <ul className="grid gap-4">
          {leads.map((lead) => (
            <li key={lead.id} className="border border-line bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl">{lead.name}</p>
                  <p className="text-muted">{lead.contact}</p>
                </div>
                <p className="text-sm text-muted">
                  {new Date(lead.createdAt).toLocaleString("ru-RU")}
                </p>
              </div>
              <p className="mt-3">{lead.projectType}</p>
              {lead.comment ? <p className="mt-2 text-muted">{lead.comment}</p> : null}
              <p className="mt-3 text-sm text-muted">
                Источник: {lead.source === "quiz" ? "ИИ-квиз" : "форма"} · Telegram:{" "}
                {lead.telegramSent ? "отправлено" : "нет"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {statuses.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onStatus(lead.id, item.id)}
                    className={`rounded-full px-3 py-1 text-sm ${
                      lead.status === item.id ? "bg-accent text-[#12161a]" : "border border-line"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
