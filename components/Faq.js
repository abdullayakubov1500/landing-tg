"use client";

import { useState } from "react";

const items = [
  {
    q: "Сколько стоит лендинг?",
    a: "Лендинг с формой — от 90 000 ₽. Сайт с ИИ-квизом, админкой и Telegram — от 140 000 ₽. Точную цифру считаем после брифа.",
  },
  {
    q: "За сколько сделаете?",
    a: "Обычно 10–21 день: тексты и квиз в первую неделю, вёрстка и интеграции во вторую, запуск и правки после.",
  },
  {
    q: "ИИ отвечает что угодно?",
    a: "Нет. Помощник знает ваши услуги, цены-ориентиры и сценарий квиза. Если вопрос мимо — он возвращает к заявке.",
  },
  {
    q: "Куда падают заявки?",
    a: "В админ-панель на /admin и дублем в Telegram-чат или группу через бота. База не нужна — лиды пишутся на сервере.",
  },
  {
    q: "Можно ли без тёмной темы и параллакса?",
    a: "Да. На сайте есть светлая тема, а если в системе включено уменьшение движения, параллакс отключается сам.",
  },
  {
    q: "Что с правками после сдачи?",
    a: "Две итерации в первые 14 дней входят в стоимость. Дальше — отдельный час поддержки, без сюрпризов в счёте.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 data-reveal className="font-display text-4xl md:text-5xl">
          Часто спрашивают до старта
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} data-reveal>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  onClick={() => setOpen(active ? -1 : index)}
                  aria-expanded={active}
                >
                  <span className="font-display text-xl">{item.q}</span>
                  <span className="mt-1 text-accent">{active ? "–" : "+"}</span>
                </button>
                {active ? <p className="pb-5 pr-8 text-muted">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
