const reviews = [
  {
    name: "Марина, йога-студия",
    quote:
      "Раньше заявки терялись в директ. Теперь квиз сам спрашивает удобное время и кидает контакт в группу администраторов.",
    result: "38 заявок за первый месяц",
  },
  {
    name: "Илья, ремонт квартир",
    quote:
      "Люди боялись оставлять телефон сразу. ИИ сначала считает примерный объём, потом просит контакт — отказ почти пропал.",
    result: "заявка с квиза в 2 раза чаще, чем с формы",
  },
  {
    name: "Катя, онлайн-школа",
    quote:
      "Админка простая, Telegram дублирует всё. Я вижу бриф ещё до звонка и не трачу созвон на «а что вам нужно».",
    result: "запуск за 16 дней",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="border-y border-line bg-plate/50 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <h2 data-reveal className="font-display max-w-xl text-4xl md:text-5xl">
          Клиенты приходят уже с брифом
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((item) => (
            <figure key={item.name} data-reveal className="flex flex-col justify-between bg-bg p-6">
              <blockquote className="text-lg leading-relaxed">{item.quote}</blockquote>
              <figcaption className="mt-8">
                <p className="font-display">{item.name}</p>
                <p className="mt-1 text-sm text-accent">{item.result}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
