"use client";

export default function Hero() {
  function openQuiz() {
    window.dispatchEvent(new Event("open-ai-quiz"));
  }

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-24">
      <div
        data-speed="0.35"
        className="pointer-events-none absolute -left-24 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)]"
      />
      <div
        data-speed="1.4"
        className="pointer-events-none absolute right-[-8rem] top-40 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--teal)_35%,transparent),transparent_70%)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16">
        <div>
          <p className="mb-5 max-w-md text-muted">
            Веб-ателье Оксид собирает лендинги, которые сами ведут разговор и оставляют заявку в Telegram.
          </p>
          <h1 className="font-display max-w-xl text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.92] tracking-tight">
            Сайт, который сам собирает заявки
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            ИИ-квиз отвечает на вопросы по услуге, мягко уточняет бриф и передаёт контакт вам в админку и мессенджер.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#lead"
              className="rounded-full bg-accent px-6 py-3 font-medium text-[#12161a]"
            >
              Рассчитать проект
            </a>
            <button
              type="button"
              onClick={openQuiz}
              className="rounded-full border border-line px-6 py-3 text-fg"
            >
              Поговорить с ИИ
            </button>
          </div>
        </div>

        <div className="relative h-[28rem]">
          <article
            data-speed="0.7"
            className="absolute left-0 top-8 w-[78%] rounded-[1.6rem] border border-line bg-plate p-5 shadow-[0_24px_80px_rgba(0,0,0,.18)]"
          >
            <div className="mb-4 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="h-2 w-2 rounded-full bg-teal" />
              <span className="h-2 w-2 rounded-full bg-line" />
            </div>
            <p className="font-display text-2xl leading-none">Лендинг с квизом</p>
            <p className="mt-3 text-sm text-muted">Заявка уходит в Telegram за 12 секунд после последнего ответа.</p>
            <div className="mt-6 h-24 rounded-xl bg-card" />
          </article>
          <article
            data-speed="1.25"
            className="absolute bottom-4 right-0 w-[70%] rounded-[1.6rem] border border-accent/40 bg-card p-5"
          >
            <p className="text-sm text-muted">ИИ-помощник</p>
            <p className="mt-2 font-display text-xl">Какой сайт нужен?</p>
            <p className="mt-4 rounded-2xl bg-plate px-3 py-2 text-sm">Лендинг для студии йоги</p>
          </article>
        </div>
      </div>
    </section>
  );
}
