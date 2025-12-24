import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Award, MapPin, Users } from 'lucide-react';
import FlipCard from './FlipCard';

interface HistoriaCongregacionProps {
  onBack: () => void;
}

const HistoriaCongregacion: React.FC<HistoriaCongregacionProps> = ({ onBack }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      {/* Header with back button */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-all duration-300 mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </button>
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Historia de la Congregación
          </h1>
        </div>
      </div>

      {/* Quick Access Navigation */}
      <div className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => scrollToSection('historia-congregacion')}
              className="flex items-center space-x-2 px-6 py-4 text-gray-700 hover:text-red-700 hover:bg-red-50 transition-all duration-300 whitespace-nowrap border-b-2 border-transparent hover:border-red-700 flex-shrink-0"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">Historia Congregación</span>
            </button>
            <button
              onClick={() => scrollToSection('vision-mision')}
              className="flex items-center space-x-2 px-6 py-4 text-gray-700 hover:text-rose-700 hover:bg-rose-50 transition-all duration-300 whitespace-nowrap border-b-2 border-transparent hover:border-rose-700 flex-shrink-0"
            >
              <Award className="w-5 h-5" />
              <span className="font-semibold">Visión & Misión</span>
            </button>
            <button
              onClick={() => scrollToSection('objetivos')}
              className="flex items-center space-x-2 px-6 py-4 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 whitespace-nowrap border-b-2 border-transparent hover:border-red-600 flex-shrink-0"
            >
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Carisma</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className={`relative h-[500px] overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src="https://i.postimg.cc/PrthSw3c/foto.webp"
          alt="Historia de la Congregación Sagrados Corazones"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/40 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl inline-block">
              <img
                src="https://i.postimg.cc/R0wcCy7H/logo-version-Horizontal-FULL-COLOR.webp"
                alt="Logo Sagrados Corazones"
                className="h-20 md:h-28 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de 'Historia de la Congregación' eliminada según solicitud */}

      {/* Vision y Mision Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div id="vision-mision" className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-1000 delay-700 scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Visión & Misión</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
              <div className="relative order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="https://i.postimg.cc/vZxQnd2N/Ftos.png"
                    alt="Visión y Misión"
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-200 rounded-full opacity-20 blur-2xl"></div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <FlipCard
                  type="vision"
                  title="Visión"
                  content="Formar una comunidad educativa que contempla, vive y anuncia al mundo el amor de Dios encarnado en Jesús, desarrollando en nuestros estudiantes un profundo espíritu de fe, fraternidad cristiana y compromiso misionero para construir un mundo más justo en solidaridad con los más necesitados."
                />
                <FlipCard
                  type="mision"
                  title="Misión"
                  content="Educar en el carisma de los Sagrados Corazones, formando personas que vivan la experiencia religiosa profunda centrada en la amistad con Jesús, la devoción a los Sagrados Corazones de Jesús y María, y la adoración contemplativa del Santísimo Sacramento, para que sean agentes de transformación evangelizadora en medio de los marginados y afligidos."
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 italic flex items-center justify-center space-x-2">
                <span>💡</span>
                <span>Haz clic en las tarjetas para ver el contenido completo</span>
              </p>
            </div>

            <div id="objetivos" className="mt-12 scroll-mt-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Información de la Congregación</h3>
              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg shadow-md p-6 mb-8 border-t-4 border-red-600">
                <h4 className="text-xl font-bold text-red-700 mb-4">Carisma: Contemplar, Vivir y Anunciar el Amor de Dios</h4>
                <p className="text-gray-700 leading-relaxed">
                  La Congregación vive una experiencia religiosa profunda centrada en la amistad con Jesús mediante la adoración eucarística y contemplativa.
                  Desarrolla vínculos fraternos con espíritu de familia, centrados en los Sagrados Corazones de Jesús y María.
                  Su misión evangelizadora se ejerce especialmente entre los marginados y afligidos, formando líderes servidores comprometidos con la construcción de un mundo más justo.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-600">
                  <h4 className="text-xl font-bold text-red-700 mb-3">Fundadores</h4>
                  <p className="text-gray-700">
                    <strong>Pierre Coudrin</strong> y <strong>Henriette Aymer de la Chevalerie</strong> fundaron la Congregación en 1800 en Poitiers, Francia, durante la Revolución francesa,
                    para propagar la devoción a los Sagrados Corazones y mantener la Adoración Perpetua del Santísimo Sacramento.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-rose-600">
                  <h4 className="text-xl font-bold text-rose-700 mb-3">Presencia Global</h4>
                  <p className="text-gray-700">
                    Presente en más de <strong>30 países</strong> en <strong>5 continentes</strong>, con más de <strong>1,100 religiosos</strong> dedicados a la misión evangelizadora.
                    Incluye hermanos, hermanas y laicos comprometidos.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Contacto de Casas Provinciales</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-bold text-red-600 mb-2">Casa Provincial de los Hermanos</h5>
                    <p className="text-gray-700 text-sm">Domingo Faustino Sarmiento 275, Ñuñoa – Santiago</p>
                    <p className="text-red-600 font-semibold mt-1">+562 2783 8400</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-red-600 mb-2">Casa Provincial de las Hermanas</h5>
                    <p className="text-gray-700 text-sm">Av. Diagonal Oriente 3371, Providencia – Santiago</p>
                    <p className="text-red-600 font-semibold mt-1">+562 2209 2383 – +562 2341 1157</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-6 mt-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 text-white">
            <div className="text-3xl font-bold mb-2">225+</div>
            <div className="text-red-100">Años de Historia</div>
          </div>
          <div className="bg-gradient-to-br from-rose-600 to-rose-700 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 text-white">
            <div className="text-3xl font-bold mb-2">1,100+</div>
            <div className="text-rose-100">Religiosos Activos</div>
          </div>
          <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 text-white">
            <div className="text-3xl font-bold mb-2">30+</div>
            <div className="text-red-100">Países de Presencia</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriaCongregacion;
