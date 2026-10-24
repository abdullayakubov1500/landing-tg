"use client";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="font-display text-lg tracking-tight">
          Оксид
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <a href="#benefits" className="hover:text-fg">
            Почему мы
          </a>
          <a href="#reviews" className="hover:text-fg">
            Кейсы
          </a>
          <a href="#faq" className="hover:text-fg">
            Вопросы
          </a>
          <a href="#lead" className="hover:text-fg">
            Заявка
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#lead"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#12161a]"
          >
            Рассчитать проект
          </a>
        </div>
      </div>
    </header>
  );
}
