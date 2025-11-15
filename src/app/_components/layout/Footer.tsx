import Link from "next/link";

export function Footer() {
  return (
    <footer
      className={`fixed bottom-0 left-0 z-50 flex w-full items-center justify-center gap-8 px-8 h-16 text-white mix-blend-difference`}
    >
      <nav className="flex items-center gap-8">
        <Link href="#inicio">Inicio</Link>
        <Link href="#sobre-mi">Sobre Mí</Link>
        <Link href="#proyectos">Proyectos</Link>
        <Link href="#contacto">Contacto</Link>
      </nav>
    </footer>
  );
}