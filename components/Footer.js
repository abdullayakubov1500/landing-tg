export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>Оксид, веб-ателье</p>
        <a href="/admin" className="hover:text-fg">
          Админ-панель
        </a>
      </div>
    </footer>
  );
}
