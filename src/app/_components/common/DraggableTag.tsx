"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Estilos CSS en línea
const tagStyle: React.CSSProperties = {
  position: "sticky",
  right: 0,
  padding: "10px 20px",
  cursor: "grab",
  userSelect: "none",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  zIndex: 1,
};

const draggingStyle: React.CSSProperties = {
  cursor: "grabbing",
};

export const DraggableTag: React.FC = () => {
  // Estados
  const [position, setPosition] = useState({ x: 0, y: -90 });
  const [isDragging, setIsDragging] = useState(false);

  // Refs para datos y funciones
  const dragOffset = useRef({ offsetX: 0, offsetY: 0 });

  // Refs para almacenar las funciones de movimiento y soltado
  // Usaremos estas Refs para asegurarnos de que removeEventListener tenga la misma instancia.
  const handlersRef = useRef<{
    move: ((e: MouseEvent) => void) | null;
    up: (() => void) | null;
  }>({ move: null, up: null });

  // --- 1. Definición de Manejadores (Handlers) ---

  // Función de Mover: Se define usando una función normal y se guarda en el Ref.
  const handleMouseMove = (e: MouseEvent) => {
    // Si se llama, el arrastre está activo, así que usamos el offset del Ref
    const { offsetX, offsetY } = dragOffset.current;

    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    setPosition({ x: newX, y: newY });
  };

  // Función de Soltar: Se define usando una función normal.
  const handleMouseUp = () => {
    // Detener el arrastre y actualizar el cursor
    setIsDragging(false);

    // Limpiamos los listeners globales usando las funciones guardadas en el Ref
    if (handlersRef.current.move) {
      document.removeEventListener("mousemove", handlersRef.current.move);
    }
    if (handlersRef.current.up) {
      document.removeEventListener("mouseup", handlersRef.current.up);
    }

    // Resetear Refs después de la limpieza
    handlersRef.current = { move: null, up: null };
  };

  // --- 2. Manejador de Clic Inicial (MouseDown) ---

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Calcular el "offset": e.clientX/Y - position.x/y para la transformación
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    // Guardar el offset en el Ref
    dragOffset.current = {
      offsetX,
      offsetY,
    };

    // Iniciar el arrastre y actualizar el cursor
    setIsDragging(true);

    // Guardar las funciones de handlers en el Ref
    handlersRef.current = {
      move: handleMouseMove,
      up: handleMouseUp,
    };

    // Añadir los listeners al 'document' usando las funciones guardadas en los Refs
    document.addEventListener("mousemove", handlersRef.current.move!);
    document.addEventListener("mouseup", handlersRef.current.up!);
  };

  // --- 3. Efecto de Limpieza (Unmount) ---

  useEffect(() => {
    // La función de retorno se ejecuta al desmontar el componente
    return () => {
      if (handlersRef.current.move) {
        document.removeEventListener("mousemove", handlersRef.current.move);
      }
      if (handlersRef.current.up) {
        document.removeEventListener("mouseup", handlersRef.current.up);
      }
    };
  }, []); // Se ejecuta solo al montar/desmontar

  // --- 4. Renderizado ---

  return (
    <div
      style={{
        ...tagStyle,
        // Aplicamos la posición de forma dinámica
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        // Aplicamos estilos de "arrastre" si el estado 'isDragging' es true
        ...(isDragging ? draggingStyle : {}),
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative w-fit">
        {/* Usamos el estado 'isDragging' para mostrar/ocultar */}
        {!isDragging && (
          <p className="absolute top-2/4 left-2/4 z-10 w-fit -translate-x-2/4 -translate-y-2/4 bg-white px-1 font-bold tracking-wide text-[#ca2e40]">
            DRAGGABLE FISH
            <span className="-mt-1 block w-fit text-sm font-medium tracking-wide">
              Drag me to new depths
            </span>
          </p>
        )}

        <Image
          alt="pesscado"
          width={600}
          height={120}
          src="/img/pescado.png"
          className="w-[45vw] min-w-[400px] "
        />
      </div>
    </div>
  );
};
