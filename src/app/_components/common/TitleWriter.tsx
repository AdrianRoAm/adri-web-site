"use client";
import React, { useEffect, useRef } from "react";

import type { WithClassName } from "../../../types/react";
import { twMerge } from "tailwind-merge";

interface TitleWriterProps {
  texts: string | string[];
  delay?: number;
  loopDelay?: number;
  untypeDelay?: number;
  textClassName?: string;
  spanClassName?: string;
}

const TitleWriter: React.FC<WithClassName<TitleWriterProps>> = ({
  texts,
  delay = 0,
  loopDelay = 2000,
  untypeDelay = 500,
  className,
  textClassName,
  spanClassName,
}) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const state = useRef({ disposed: false, textIndex: 0 }).current;
  
  // ⬇️ CORRECCIÓN 1: useRef DEBE tener un valor inicial.
  // 'useRef<NodeJS.Timeout>()' no es válido.
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const textElement = textRef.current;
    // Si el ref no está listo, no hacer nada
    if (!textElement) return;

    const textsArray = Array.isArray(texts) ? texts : [texts];
    const isCarousel = textsArray.length > 1;

    // ⬇️ CORRECCIÓN 2: Añadir una guarda para arrays vacíos.
    // Esto evita que textsArray[0] sea 'undefined'.
    if (textsArray.length === 0 || !textsArray[0]) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const type = (text: string, onComplete: () => void) => {
      if (mediaQuery.matches) {
        textElement.textContent = text.replace(/\*/g, ""); // Quitar markdown
        onComplete();
        return;
      }

      let cnt = -1;
      let needToCloseEm = false;
      let needToCloseBold = false;

      const movetoNextChar = (): void => {
        if (state.disposed) return;
        if (cnt < text.length) {
          cnt += 1;
          let base = 0;
          if (text[cnt] === "*") {
            if (text[cnt + 1] === "*") {
              needToCloseBold = !needToCloseBold;
            } else if (text[cnt - 1] !== "*") {
              needToCloseEm = !needToCloseEm;
            }
          } else {
            let newText = `${text.substring(0, cnt + 1).trim()}`;
            newText += `${needToCloseEm ? "*" : ""}${
              needToCloseBold ? "**" : ""
            }`;
            textElement.textContent = newText;
            base = text[cnt] === " " ? 30 : 20;
            if (text[cnt] === "\n") {
              base = 500;
            }
            base += Math.random() * 25;
          }
          timeoutId.current = setTimeout(movetoNextChar, base);
        } else {
          onComplete(); // Llamar al siguiente paso
        }
      };
      movetoNextChar();
    };

    const untype = (onComplete: () => void) => {
      if (mediaQuery.matches) {
        textElement.textContent = "";
        onComplete();
        return;
      }

      const text = textElement.textContent || "";
      let cnt = text.length;

      const movetoPrevChar = () => {
        if (state.disposed) return;
        if (cnt >= 0) {
          textElement.textContent = text.substring(0, cnt);
          cnt -= 1;
          timeoutId.current = setTimeout(
            movetoPrevChar,
            20 + Math.random() * 20,
          );
        } else {
          onComplete(); // Siguiente paso
        }
      };
      movetoPrevChar();
    };

    const runCarousel = () => {
      if (state.disposed) return;

      const currentText = textsArray[state.textIndex];

      // ⬇️ CORRECCIÓN 3: Comprobación de tipo para satisfacer a TypeScript.
      // Aunque nuestra lógica asegura que no es undefined, TS no lo sabe.
      if (typeof currentText !== "string") {
        return;
      }

      type(currentText, () => {
        timeoutId.current = setTimeout(() => {
          untype(() => {
            state.textIndex = (state.textIndex + 1) % textsArray.length;
            timeoutId.current = setTimeout(runCarousel, untypeDelay);
          });
        }, loopDelay);
      });
    };

    const startTyping = (): void => {
      // Usamos '!' (Non-null assertion) porque la guarda de la CORRECCIÓN 2
      // ya ha comprobado que textsArray[0] existe.
      const firstText = textsArray[0]!;

      if (isCarousel) {
        runCarousel();
      } else {
        type(firstText, () => {
          /* No hacer nada más */
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === true) {
            timeoutId.current = setTimeout(startTyping, delay);
            observer.unobserve(textElement);
          }
        });
      },
      {
        threshold: [0],
      },
    );

    observer.observe(textElement);

    return (): void => {
      observer.unobserve(textElement);
      clearTimeout(timeoutId.current);
      state.disposed = true;
    };
  }, [delay, texts, loopDelay, untypeDelay, state]);

  return (
    <div className={twMerge("", className)}>
      <div
        className={twMerge(
          "block font-bold -tracking-[.03rem] text-black text-3xl uppercase",
          textClassName,
        )}
      >
        <h2 className="inline" ref={textRef} />
        <span
          className={twMerge(
            "xs:-mb-1.5 xs:ml-2 xs:h-6 xs:w-1 animate-write -mb-1 ml-1 inline-block h-7 w-1.5 rounded-[3px] bg-black",
            spanClassName,
          )}
        />
      </div>
    </div>
  );
};

export default React.memo(TitleWriter);