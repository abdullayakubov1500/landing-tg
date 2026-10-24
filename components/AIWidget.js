"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { QUIZ_STEPS } from "@/lib/quiz";

const firstMessage = {
  role: "assistant",
  content: "Привет. Я помогу собрать бриф за минуту. Какой сайт нужен: лендинг, многостраничный или магазин?",
};

export default function AIWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([firstMessage]);
  const [fallback, setFallback] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const openQuiz = () => setOpen(true);
    window.addEventListener("open-ai-quiz", openQuiz);
    return () => window.removeEventListener("open-ai-quiz", openQuiz);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const placeholder = useMemo(() => {
    if (done) return "Заявка уже отправлена";
    if (fallback && step === QUIZ_STEPS.length - 1) return "Имя и телефон или Telegram";
    return "Ваш ответ";
  }, [done, fallback, step]);

  async function submitLead(payload) {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Не удалось сохранить заявку.");
    }
  }

  async function handleFallback(text) {
    const current = QUIZ_STEPS[step];
    const nextAnswers = { ...answers, [current.id]: text };
    setAnswers(nextAnswers);
    const nextStep = step + 1;
    if (nextStep < QUIZ_STEPS.length) {
      setStep(nextStep);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: QUIZ_STEPS[nextStep].question },
      ]);
      return;
    }

    const contactRaw = nextAnswers.contact || "";
    const parts = contactRaw.split(/[,/]| и /i).map((item) => item.trim()).filter(Boolean);
    const name = parts[0] || "Клиент";
    const contact = parts[1] || parts[0] || contactRaw;
    await submitLead({
      name,
      contact,
      projectType: nextAnswers.type || "",
      comment: `Цель: ${nextAnswers.goal || "—"}. Срок: ${nextAnswers.deadline || "—"}. Бюджет: ${nextAnswers.budget || "—"}.`,
      source: "quiz",
      quiz: nextAnswers,
    });
    setDone(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Заявку сохранил и отправил команде. Напишем вам в тот же день.",
      },
    ]);
  }

  async function onSend(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy || done) return;
    setInput("");
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setBusy(true);

    try {
      if (fallback) {
        await handleFallback(text);
        return;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const payload = await response.json();
      if (payload.fallback) {
        const lastUser = [...nextMessages].reverse().find((item) => item.role === "user");
        setFallback(true);
        if (lastUser) {
          setAnswers({ type: lastUser.content });
          setStep(1);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `Записал. ${QUIZ_STEPS[1].question}`,
            },
          ]);
        } else {
          setStep(0);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: QUIZ_STEPS[0].question },
          ]);
        }
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: payload.message }]);
      if (payload.submitted) setDone(true);
    } catch {
      setFallback(true);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Связь с ИИ пропала. Продолжим квиз здесь. Какой сайт нужен?" },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open ? (
        <div className="mb-3 flex h-[28rem] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[1.4rem] border border-line bg-card shadow-[0_20px_60px_rgba(0,0,0,.25)]">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="font-display">Квиз Оксид</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть">
              ×
            </button>
          </div>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((item, index) => (
              <p
                key={`${item.role}-${index}`}
                className={
                  item.role === "user"
                    ? "ml-8 rounded-2xl bg-accent px-3 py-2 text-[#12161a]"
                    : "mr-8 rounded-2xl bg-plate px-3 py-2"
                }
              >
                {item.content}
              </p>
            ))}
          </div>
          <form onSubmit={onSend} className="flex gap-2 border-t border-line p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              disabled={done}
              className="flex-1 rounded-full border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={busy || done}
              className="rounded-full bg-accent px-4 py-2 text-sm text-[#12161a] disabled:opacity-50"
            >
              Ок
            </button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-full bg-accent px-5 py-3 font-medium text-[#12161a] shadow-[0_12px_30px_var(--glow)]"
      >
        {open ? "Скрыть квиз" : "ИИ-квиз"}
      </button>
    </div>
  );
}
