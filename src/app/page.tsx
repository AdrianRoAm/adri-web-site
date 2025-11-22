// ⬇️ 1. AÑADE "use client"
//    Tu etiqueta es interactiva (usa hooks y eventos),
//    por lo que esta página debe ser un Componente de Cliente.
"use client";

import TitleWriter from "./_components/common/TitleWriter";
// ⬇️ 2. IMPORTA tu nuevo componente
import { DraggableTag } from "./_components/common/DraggableTag"; // Ajusta la ruta si es necesario

export default function Home() {
  return (
    <>
      <section
        id="inicio"
        // ⬇️ 3. AÑADE "relative"
        //    Esto es CLAVE para que la etiqueta se mueva
        //    DENTRO de esta sección y no por toda la página.
        className="relative flex h-full items-center justify-center border-r border-white/20 bg-white text-black"
      >
        <div className="flex">
          <div className="pointer-events-none relative z-10 flex w-screen snap-center flex-col">
           

            <TitleWriter
            delay={10}
              texts={[
                "Diseñador Gráfico y Estratega Visual Creativo",
                "Desarrollador Front-End especializado en ui",
                "Experto en UI/UX y Experiencia Digital",
              ]}
              className="-mb-2 pl-2 "
            />
            
            <h2 className="animate-fade-in-right text-fluid-hero sticky right-0 font-bold">
              RODRIGUEZ AMAGO
            </h2>
             <div className="relative ">
            <p className=" sticky right-0 animate-fade-in-left max-w-xl pl-2.5 text-xs tracking-wider uppercase">
              Soy diseñador gráfico y desarrollador front-end. Mi perfil combina
              la creación de identidades visuales con la implementación técnica
              de interfaces de usuario (UI). Me especializo en traducir sistemas
              de diseño en componentes de código interactivos, eficientes y
              accesibles.
            </p>
            </div>
          </div>
          <div className="pointer-events-none relative z-10 flex w-screen snap-center flex-col pl-40">
            <TitleWriter
              texts={[
                "Diseñador Gráfico y Estratega Visual Creativo",
                "Desarrollador Front-End especializado en ui",
                "Experto en UI/UX y Experiencia Digital",
              ]}
              className="-mb-2 pl-2"
            />
            <h2 className="text-fluid-hero sticky right-0 font-bold">ADRIAN</h2>
            <p className="max-w-xl pl-2.5 text-xs tracking-wider uppercase">
              Soy diseñador gráfico y desarrollador front-end. Mi perfil combina
              la creación de identidades visuales con la implementación técnica
              de interfaces de usuario (UI). Me especializo en traducir sistemas
              de diseño en componentes de código interactivos, eficientes y
              accesibles.
            </p>
          </div>
        </div>

        {/* ⬇️ 4. AÑADE LA ETIQUETA AQUÍ */}
        {/* Se posicionará de forma absoluta dentro de la sección */}
        {/* <DraggableTag /> */}
      </section>

      <section
        id="sobre-mi"
        // (Opcional) Si también quisieras una etiqueta aquí,
        // tendrías que añadir 'relative' a esta sección también.
        className="flex h-full min-w-screen items-center justify-center border-r border-white/20 bg-black px-12 text-white"
      >
        {" "}
        <div className="flex flex-col">
          <TitleWriter
            texts={[
              "Diseñador Gráfico y Estratega Visual Creativo",
              "Desarrollador Front-End especializado en ui",
              "Experto en UI/UX y Experiencia Digital",
            ]}
            textClassName="text-white"
            spanClassName="bg-white"
            className="pl-2"
          />
          <h2 className="font-outline text-6xl">SECCIÓN 2: SOBRE MÍ</h2>
        </div>
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
