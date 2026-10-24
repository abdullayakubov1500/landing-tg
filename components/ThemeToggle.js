"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <span className="h-9 w-9 rounded-full border border-line" />;
  }

  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg transition hover:border-accent"
      aria-label={dark ? "Включить светлую тему" : "Включить тёмную тему"}
    >
      <span className="block h-3.5 w-3.5 rounded-full bg-accent" />
    </button>
  );
}
