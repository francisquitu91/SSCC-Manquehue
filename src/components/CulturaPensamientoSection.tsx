import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, Brain, Users, Target } from 'lucide-react';

interface CulturaPensamientoSectionProps {
  onBack: () => void;
}

const CulturaPensamientoSection: React.FC<CulturaPensamientoSectionProps> = ({ onBack }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100">
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
            Cultura de Pensamiento
          </h1>
        </div>
      </div>

      {/* Quick Access Navigation */}
      <div className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => scrollToSection('que-es')}
              className="flex items-center space-x-2 px-6 py-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 whitespace-nowrap border-b-2 border-transparent hover:border-purple-700 flex-shrink-0"
            >
              <Lightbulb className="w-5 h-5" />
              <span className="font-semibold">¿Qué es?</span>
            </button>
            <button
              onClick={() => scrollToSection('como-vivimos')}
              className="flex items-center space-x-2 px-6 py-4 text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-300 whitespace-nowrap border-b-2 border-transparent hover:border-indigo-700 flex-shrink-0"
            >
              <Brain className="w-5 h-5" />
              <span className="font-semibold">Cómo la vivimos</span>
            </button>
            <button
              onClick={() => scrollToSection('objetivo')}
              className="flex items-center space-x-2 px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 whitespace-nowrap border-b-2 border-transparent hover:border-blue-600 flex-shrink-0"
            >
              <Target className="w-5 h-5" />
              <span className="font-semibold">Objetivo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className={`relative h-[500px] overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src="https://i.postimg.cc/BbSpTR8R/ceremonia1sscc.jpg"
          alt="Cultura de Pensamiento - Colegio Sagrados Corazones Manquehue"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/40 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl inline-block">
              <img
                src="https://i.postimg.cc/pX9SpVm3/logosscc.png"
                alt="Logo Sagrados Corazones"
                className="h-20 md:h-28 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* ¿Qué es? Section */}
        <div id="que-es" className={`bg-white rounded-lg shadow-lg overflow-hidden mb-12 transition-all duration-1000 delay-500 scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">¿Qué es la Cultura de Pensamiento?</h2>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  En el Colegio Sagrados Corazones Manquehue promovemos una <strong>Cultura de Pensamiento</strong> que pone al estudiante en el centro del aprendizaje, fomentando el desarrollo de habilidades cognitivas, sociales y metacognitivas necesarias para comprender, reflexionar y actuar en el mundo actual.
                </p>
              </div>
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://i.postimg.cc/ryf35G2T/ninosprofe.jpg"
                  alt="Estudiantes en el aula"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cómo la vivimos Section */}
        <div id="como-vivimos" className={`bg-white rounded-lg shadow-lg overflow-hidden mb-12 transition-all duration-1000 delay-600 scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Cómo la vivimos</h2>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg order-2 lg:order-1">
                <img
                  src="https://i.postimg.cc/fLZpfBbR/ninosjugando.jpg"
                  alt="Aprendizaje colaborativo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg order-1 lg:order-2">
                <p>
                  Creemos que aprender no es solo adquirir contenidos, sino desarrollar la capacidad de pensar de manera crítica, creativa y colaborativa. Por ello, impulsamos prácticas pedagógicas que hacen visible el pensamiento en el aula, promoviendo la curiosidad, la reflexión profunda, el diálogo respetuoso y la toma de conciencia sobre cómo aprendemos.
                </p>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-l-4 border-indigo-600">
                  <p className="text-gray-700 leading-relaxed">
                    La Cultura de Pensamiento se vive cotidianamente a través de estrategias y rutinas que fortalecen la <strong>comprensión</strong>, el <strong>análisis</strong>, la <strong>argumentación</strong> y la <strong>resolución de problemas</strong>, permitiendo que nuestros estudiantes construyan aprendizajes significativos y duraderos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Objetivo Section */}
        <div id="objetivo" className={`bg-white rounded-lg shadow-lg overflow-hidden mb-12 transition-all duration-1000 delay-700 scroll-mt-24 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Nuestro Objetivo</h2>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                  <p>
                    De este modo, formamos <strong>personas autónomas, reflexivas y comprometidas</strong> con su propio aprendizaje, capaces de enfrentar los desafíos académicos y personales con sentido, responsabilidad y apertura al cambio.
                  </p>
                </div>
                <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://i.postimg.cc/fWCBzWph/ceremonia2sscc.jpg"
                    alt="Estudiantes comprometidos"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Autonomía</h3>
                  <p className="text-gray-600 text-sm">Estudiantes capaces de dirigir su propio aprendizaje</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Reflexión</h3>
                  <p className="text-gray-600 text-sm">Pensamiento crítico y profundo sobre el mundo</p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Compromiso</h3>
                  <p className="text-gray-600 text-sm">Responsabilidad con el aprendizaje y el cambio</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CulturaPensamientoSection;
