"use client";

import { useRef } from "react";
import { useHorizontalScroll } from "~/hooks/useHorizontalScroll";

type MainProps = {
  children: React.ReactNode;
};

export function Main({ children }: MainProps) {
  const mainRef = useRef<HTMLElement>(null);
  useHorizontalScroll(mainRef);

  return (
    <main
      ref={mainRef}
      className="no-scrollbar relative h-full w-full overflow-x-auto overflow-y-hidden"
    >
      <div className="flex h-full w-max">{children}</div>
    </main>
  );
}