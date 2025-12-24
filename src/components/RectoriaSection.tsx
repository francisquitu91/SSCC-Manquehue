import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface RectoriaSectionProps {
  onBack: () => void;
}

const RectoriaSection: React.FC<RectoriaSectionProps> = ({ onBack }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
            Rectoría
          </h1>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className={`relative h-[500px] overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <img
          src="https://i.postimg.cc/QtzdTX6C/rectoria.jpg"
          alt="Colegio Sagrados Corazones de Manquehue"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/40"></div>
        
        {/* Logo superpuesto */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="https://ssccmanquehue.cl/wp-content/uploads/2025/03/70SSCC_OK_transparente-4-1-1-1.png"
            alt="Logo Colegio Manquehue SSCC"
            className="h-48 w-48 object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-8 md:p-12">
            {/* Rector's Message */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg shadow-md p-8 border-t-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Mensaje del Rector</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A nombre de la comunidad del Colegio Sagrados Corazones de Manquehue quisiera darles la más cordial bienvenida a todos quienes visitan nuestra página web, tanto a quienes son parte de la comunidad como a las personas que quieren conocernos un poco más. En este espacio encontrarán la información básica para que puedan conocer quiénes somos, qué es lo que buscamos y cómo estamos organizados para lograr nuestros objetivos.
                </p>
                
                <p>
                  En primer lugar, somos un colegio de Iglesia que busca vivir su seguimiento a Jesús desde la espiritualidad de la Congregación de los Sagrados Corazones de Jesús y de María. Esto significa que queremos hacer nuestros los criterios, valores y opciones de Jesús en la realidad que nos corresponde vivir, para construir una sociedad más justa y solidaria. Queremos ser una comunidad en la que no solo se enseñen, sino que realmente se vivan nuestros valores institucionales: fraternidad, solidaridad, responsabilidad y respeto. Nuestro lema para este año, "Aprendemos y crecemos siguiendo a Cristo y sirviendo al mundo", resume nuestro anhelo como comunidad educativa: todos estamos llamados a aprender y desarrollarnos como personas, ya que el ser humano es siempre inacabado; en este proceso de crecimiento constante nuestro modelo y nuestra meta como comunidad es Jesús de Nazaret; en el Espíritu, es Él quien nos guía en la misión de construir un mundo más justo y solidario, donde cada persona sea respetada y pueda desarrollar sus potencialidades.
                </p>
                
                <p>
                  Para la realización de esta gran tarea contamos con un gran equipo de profesores, que guían estos procesos buscando que cada estudiante desarrolle un amor por el aprendizaje, con altas expectativas respecto a cada uno de ellos y en constantes procesos de perfeccionamiento profesional. Este equipo es apoyado por todos quienes trabajamos en el colegio: orientadores, psicólogos, psicopedagogos, inspectores, auxiliares, administrativos y equipo directivo.
                </p>
                
                <p>
                  Para que nuestro esfuerzo y dedicación nos permitan alcanzar nuestros objetivos contamos con el apoyo y trabajo conjunto con nuestras familias, con los padres y madres, como también con la creciente autonomía y compromiso de los estudiantes para con sus propios procesos de crecimiento y aprendizaje.
                </p>
                
                <div className="mt-8 text-center">
                  <p className="font-semibold text-gray-800">Les saluda afectuosamente,</p>
                  <p className="text-xl font-bold text-blue-900 mt-2">Fernando Maffioletti Celedón</p>
                  <p className="text-gray-600 italic">Rector</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectoriaSection;
