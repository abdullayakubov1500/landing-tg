const items = [
  {
    title: "10–21 день до запуска",
    text: "Сначала оффер и квиз, затем визуал. Не растягиваем проект на месяцы согласований.",
  },
  {
    title: "Заявки ночью тоже приходят",
    text: "ИИ закрывает типовые вопросы и собирает контакт, когда менеджер уже не на связи.",
  },
  {
    title: "Админка на вашем сайте",
    text: "Все лиды лежат в /admin: имя, контакт, бриф и статус работы.",
  },
  {
    title: "Дубль в Telegram",
    text: "Каждая заявка сразу приходит ботом в чат или группу — можно ответить с телефона.",
  },
  {
    title: "Движение без цирка",
    text: "Параллакс и появление блоков на скролле. Если человек просит меньше движения — отключаем.",
  },
  {
    title: "Правки после запуска",
    text: "Две итерации в первые две недели входят в работу, без отдельного счёта «на подумать».",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-6xl px-5 py-24">
      <div data-reveal className="max-w-2xl">
        <h2 className="font-display text-4xl leading-tight md:text-5xl">
          Сайт как мастерская, а не как витрина
        </h2>
        <p className="mt-4 text-lg text-muted">
          Мы собираем страницу вокруг заявки: оффер, доказательство, ответы и разговор с ИИ, который не теряет человека.
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article
            key={item.title}
            data-reveal
            className={`border border-line bg-card p-7 ${index % 2 === 0 ? "rounded-[1.8rem_0.4rem_1.8rem_0.4rem]" : "rounded-[0.4rem_1.8rem_0.4rem_1.8rem]"}`}
          >
            <h3 className="font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
