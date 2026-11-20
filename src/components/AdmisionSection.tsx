import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, GraduationCap, Image } from 'lucide-react';

interface AdmisionSectionProps {
  onBack: () => void;
}

const AdmisionSection: React.FC<AdmisionSectionProps> = ({ onBack }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white shadow-lg">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="group mb-4 flex items-center text-blue-600 transition-all duration-300 hover:text-blue-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Volver al inicio
          </button>
          <h1 className={`text-4xl font-bold text-gray-900 transition-all duration-1000 md:text-5xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Admisión Pre Kínder
          </h1>
        </div>
      </div>

      <nav aria-label="Accesos rápidos de admisión" className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => scrollToSection('portada-admision')}
              className="flex flex-shrink-0 items-center space-x-2 whitespace-nowrap border-b-2 border-transparent px-6 py-4 text-gray-700 transition-all duration-300 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <Image aria-hidden="true" className="h-5 w-5" />
              <span className="font-semibold">Portada</span>
            </button>
            <button
              onClick={() => scrollToSection('proceso-admision')}
              className="flex flex-shrink-0 items-center space-x-2 whitespace-nowrap border-b-2 border-transparent px-6 py-4 text-gray-700 transition-all duration-300 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <GraduationCap aria-hidden="true" className="h-5 w-5" />
              <span className="font-semibold">Proceso de postulación</span>
            </button>
          </div>
        </div>
      </nav>

      <section id="portada-admision" aria-label="Portada de admisión Pre Kínder 2028" className="scroll-mt-24 bg-blue-100">
        <img
          src="https://i.postimg.cc/sD7JXyqm/imagenssccm.png"
          alt="Gráfica de admisión 2028 del Colegio SSCC Manquehue"
          className="mx-auto block h-auto w-full max-w-[1200px]"
        />
      </section>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section
          id="proceso-admision"
          aria-labelledby="prekinder-admission-heading"
          className={`scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-8 shadow-xl transition-all duration-1000 sm:p-10 lg:p-14 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Proceso de postulación 2028
          </p>
          <h2
            id="prekinder-admission-heading"
            className="mb-6 text-3xl font-bold leading-tight text-blue-950 sm:text-4xl"
          >
            Abierta admisión Pre Kínder 2028
          </h2>
          <p className="mb-5 text-base leading-7 text-slate-700 sm:text-lg">
            En el Colegio SSCC Manquehue formamos mucho más que buenos estudiantes: formamos
            personas que piensan, escuchan y ponen sus talentos al servicio de los demás. Creemos
            en una educación que combina excelencia académica, valores y comunidad.
          </p>
          <p className="mb-5 text-lg leading-7 text-slate-700 sm:text-xl">
            Porque el futuro va a necesitar inteligencia, sí. Pero, sobre todo, va a necesitar
            <span className="font-semibold text-blue-900"> corazón.</span>
          </p>
          <p className="mb-8 text-lg font-bold leading-7 text-blue-900 sm:text-xl">
            ¡Bienvenidos los nuevos Manquehuinos de corazón!
          </p>
          <a
            href="https://manquehue.postulaciones.colegium.com/loginColegio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-center font-semibold text-white shadow-lg transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Ingresa aquí para comenzar tu proceso de postulación
            <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
          </a>
        </section>
      </main>
    </div>
  );
};

export default AdmisionSection;
