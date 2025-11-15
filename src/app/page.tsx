export default function Home() {
  return (
    <>
      <section
        id="inicio"
        className="flex h-full min-w-screen items-center justify-center border-r border-white/20 bg-white px-12 text-black"
      >        
        <h2 className="text-fluid-hero font-black">SECCIÓN 1: INICIO</h2>
      </section>

      <section
        id="sobre-mi"
        className="flex h-full min-w-screen items-center justify-center border-r border-white/20 bg-black px-12 text-white"
      >        
        <h2 className="text-6xl font-outline">SECCIÓN 2: SOBRE MÍ</h2>
      </section>

      <section
        id="proyectos"
        className="flex h-full min-w-screen items-center justify-center border-r border-white/20 bg-white px-12 text-black"
      >
        <h2 className="text-6xl font-light">SECCIÓN 3: PROYECTOS</h2>
      </section>

      <section
        id="contacto"
        className="flex h-full min-w-screen items-center justify-center bg-black px-12 text-white"
      >
        <h2 className="text-6xl font-medium">SECCIÓN 4: CONTACTO</h2>
      </section>
    </>
  );
}