"use client";

import { useState } from "react";

const initial = {
  name: "",
  contact: "",
  projectType: "Лендинг",
  comment: "",
};

export default function LeadForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "form" }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Не удалось отправить заявку.");
      }
      setStatus("done");
      setForm(initial);
    } catch (err) {
      setStatus("idle");
      setError(err.message);
    }
  }

  return (
    <section id="lead" className="mx-auto max-w-6xl px-5 pb-28">
      <div className="grid overflow-hidden border border-line bg-card lg:grid-cols-[1fr_1.1fr]">
        <div data-reveal className="bg-plate p-8 md:p-12">
          <h2 className="font-display text-4xl">Оставьте бриф — ответим в тот же день</h2>
          <p className="mt-4 text-muted">
            Напишите, какой сайт нужен. Если удобнее говорить с ИИ, откройте квиз в углу экрана.
          </p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 p-8 md:p-12" data-reveal>
          <label className="grid gap-2 text-sm">
            Имя
            <input
              required
              minLength={2}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-md border border-line bg-bg px-3 py-3 outline-none focus:border-accent"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Телефон или Telegram
            <input
              required
              minLength={3}
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="rounded-md border border-line bg-bg px-3 py-3 outline-none focus:border-accent"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Тип проекта
            <select
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              className="rounded-md border border-line bg-bg px-3 py-3 outline-none focus:border-accent"
            >
              <option>Лендинг</option>
              <option>Многостраничный сайт</option>
              <option>Интернет-магазин</option>
              <option>Сайт с ИИ и Telegram</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Комментарий
            <textarea
              rows={4}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="resize-none rounded-md border border-line bg-bg px-3 py-3 outline-none focus:border-accent"
            />
          </label>
          {error ? <p className="text-sm text-accent-deep">{error}</p> : null}
          {status === "done" ? (
            <p className="text-sm text-teal">Заявка сохранена. Мы напишем вам.</p>
          ) : null}
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 rounded-full bg-accent px-6 py-3 font-medium text-[#12161a] disabled:opacity-60"
          >
            {status === "loading" ? "Отправляем…" : "Отправить заявку"}
          </button>
        </form>
      </div>
    </section>
  );
}
