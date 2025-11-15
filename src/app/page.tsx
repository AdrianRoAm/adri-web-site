

export default function Home() {
  return (

      <>      
        <section
          id="inicio"
          className="flex h-full bg-white text-black w-screen items-center justify-center border-r border-white/20"
        >
          <h2 className="text-6xl font-black">SECCIÓN 1: INICIO</h2>
        </section>

        <section
          id="sobre-mi"
          className="flex h-full bg-black text-white w-screen items-center justify-center border-r border-white/20"
        >
          <h2 className="font-outline text-6xl">SECCIÓN 2: SOBRE MÍ</h2>
        </section>

        <section
          id="proyectos"
          className="flex h-full bg-white text-black w-screen items-center justify-center border-r border-white/20"
        >
          <h2 className="text-6xl font-light">SECCIÓN 3: PROYECTOS</h2>
        </section>

        <section
          id="contacto"
          className="flex h-full w-screen bg-black text-white items-center justify-center"
        >
          <h2 className="text-6xl font-medium">SECCIÓN 4: CONTACTO</h2>
        </section>
      </>
      
  );
}