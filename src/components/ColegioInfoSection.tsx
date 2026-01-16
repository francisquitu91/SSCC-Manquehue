import React, { useState } from "react";

export interface ColegioSectionItem {
  title: string;
  description: string;
  onClick?: () => void;
}


const baseSecciones = [
  {
    title: "Comunidad y Espiritualidad",
    description: "Vive la espiritualidad SSCC y la vida comunitaria.",
    onClick: () => window.navigateTo && window.navigateTo('comunidad'),
  },
  {
    title: "Cultura de Pensamiento",
    description: "Desarrollamos habilidades de pensamiento crítico y creativo en nuestros estudiantes.",
    onClick: () => window.navigateTo && window.navigateTo('cultura-pensamiento'),
  },
  {
    title: "Conoce nuestros equipos",
    description: "Descubre los equipos docentes y de gestión que acompañan a nuestra comunidad.",
    onClick: () => window.navigateTo && window.navigateTo('consejo-directivo'),
  },
  {
    title: "Deportes y actividades Coprogramáticas",
    description: "Participa en deportes, talleres y actividades extracurriculares.",
    onClick: () => window.navigateTo && window.navigateTo('acles'),
  },
  {
    title: "Infraestructura",
    description: "Conoce los espacios y recursos con los que cuenta el colegio.",
    onClick: () => window.navigateTo && window.navigateTo('tour-virtual'),
  },
  {
    title: "Documentos oficiales",
    description: "Accede a reglamentos, protocolos y documentos institucionales.",
    onClick: () => window.navigateTo && window.navigateTo('documentos-institucionales'),
  },
  {
    title: "Admisión",
    description: "Infórmate sobre el proceso de admisión y requisitos.",
    onClick: null, // Se maneja con popup
  },
];


export const ColegioInfoSection: React.FC = () => {
  const [showAdmisionPopup, setShowAdmisionPopup] = useState(false);

  const secciones = baseSecciones.map((item) => {
    if (item.title === 'Admisión') {
      return {
        ...item,
        onClick: () => setShowAdmisionPopup(true),
      };
    }
    return item;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 text-center drop-shadow-lg">¡Conoce tu colegio!</h2>
        <p className="text-center text-gray-700 mb-10 text-lg max-w-2xl mx-auto">
          Te invitamos a explorar las secciones y conocer todo lo que ofrece nuestro colegio.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {secciones.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick || undefined}
              className="w-full sm:w-80 md:w-72 lg:w-64 xl:w-60 bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-7 flex flex-col items-center text-center group relative overflow-hidden"
              style={{ minHeight: 220 }}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-200 to-blue-100 opacity-30 rounded-t-3xl"></div>
              <h3 className="font-extrabold text-lg mb-2 text-blue-800 group-hover:text-blue-600 transition-colors tracking-tight drop-shadow-sm">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <span className="mt-auto inline-block text-blue-600 font-semibold group-hover:underline group-hover:text-blue-800 transition-colors">Ver más</span>
            </button>
          ))}
        </div>

        {/* Popup para Admisión */}
        {showAdmisionPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs flex flex-col items-center relative animate-fade-in">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
                onClick={() => setShowAdmisionPopup(false)}
                aria-label="Cerrar"
              >
                ×
              </button>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Admisión</h3>
              <button
                className="w-full mb-3 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                onClick={() => { setShowAdmisionPopup(false); window.navigateTo && window.navigateTo('admision-prekinder'); }}
              >
                Admisión Pre Kínder
              </button>
              <button
                className="w-full py-3 rounded-lg bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition"
                onClick={() => { setShowAdmisionPopup(false); window.navigateTo && window.navigateTo('admision-kinder-ii'); }}
              >
                Admisión Kínder a II°
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ColegioInfoSection;
